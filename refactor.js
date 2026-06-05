const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Separate Enemy.draw into standalone function
let drawEnemyFunc = `
function drawEnemy(e) {
    let isGhostPhase = false;
    if (e.type === 'ghost' && !e.isReflected) {
        isGhostPhase = Math.sin(gameTime * 3 + (e.ghostPhase||0)) > 0.5;
    }
    
    ctx.globalAlpha = isGhostPhase ? 0.2 : 1;
    ctx.shadowBlur = e.isReflected ? 20 : 10;
    ctx.shadowColor = e.isReflected ? "#fff" : e.color;
    ctx.fillStyle = e.isReflected ? "#fff" : e.color;

    ctx.beginPath();
    if (e.shape === 'circle') {
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
    } else if (e.shape === 'square') {
        ctx.rect(e.x - e.radius, e.y - e.radius, e.radius * 2, e.radius * 2);
    } else if (e.shape === 'triangle') {
        ctx.moveTo(e.x, e.y - e.radius);
        ctx.lineTo(e.x + e.radius, e.y + e.radius);
        ctx.lineTo(e.x - e.radius, e.y + e.radius);
        ctx.closePath();
    }
    ctx.fill();
    
    if (e.type === 'tank' && e.hp > 1) {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    
    // Boss HP bar
    if (e.type === 'boss' && !e.isReflected) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(e.x - 25, e.y - e.radius - 12, 50, 6);
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(e.x - 25, e.y - e.radius - 12, 50 * (e.hp / e.maxHp), 6);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(e.x - 25, e.y - e.radius - 12, 50, 6);
        ctx.shadowBlur = 25 + Math.sin(gameTime * 10) * 10;
        ctx.shadowColor = '#ff0055';
    }
    
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}
`;

code = code.replace("function createExplosion(", drawEnemyFunc + "\nfunction createExplosion(");

// 2. Change e.draw() inside enemies loop to drawEnemy(e)
code = code.replace("e.draw();", "drawEnemy(e);");

// 3. Remove draw() method from Enemy class
code = code.replace(/draw\(\)\s*\{[\s\S]*?\}\s*\}\s*function createExplosion/m, "}\n" + drawEnemyFunc + "\nfunction createExplosion");

// 4. Host/Guest split for enemies logic
let hostStart = `
                // GUEST LOGIC
                if (typeof Playroom !== 'undefined' && !Playroom.isHost()) {
                    let state = Playroom.getState('gameState');
                    if (state) {
                        enemies = state.enemies || [];
                        drops = state.drops || [];
                        score = state.score || score;
                        combo = state.combo || combo;
                        wave = state.wave || wave;
                        playerHP = state.playerHP !== undefined ? state.playerHP : playerHP;
                        totalKills = state.totalKills || totalKills;
                        bossActive = state.bossActive || false;
                        gameTime = state.gameTime || gameTime;
                    }
                    enemies.forEach(e => drawEnemy(e));
                } else {
                    // HOST LOGIC
`;

let hostEnd = `
                    if (typeof Playroom !== 'undefined') {
                        Playroom.setState('gameState', {
                            enemies: enemies.map(e => ({ x: e.x, y: e.y, radius: e.radius, color: e.color, hp: e.hp, maxHp: e.maxHp, type: e.type, isReflected: e.isReflected, shape: e.shape, ghostPhase: e.ghostPhase })),
                            drops, score, combo, wave, playerHP, totalKills, bossActive, gameTime
                        });
                    }
                } // END HOST LOGIC
`;

code = code.replace("enemies.forEach((e, i) => {", hostStart + "enemies.forEach((e, i) => {");

// Find where drops logic ends to insert hostEnd
code = code.replace("drops.splice(i, 1);\n                    }\n                });", "drops.splice(i, 1);\n                    }\n                });\n" + hostEnd);

// 5. Player collision logic
let collisionLogic = `
                    let isHit = false;
                    let targetPlayerAngle = mouseAngle;
                    let targetPlayerX = cx;
                    
                    if (typeof Playroom !== 'undefined') {
                        Playroom.getPlayers().forEach(p => {
                            let px = cx + (p.getState('xOffset') || 0);
                            let d = Math.hypot(e.x - px, e.y - cy);
                            if (!e.isReflected && d < 85 && d > 55 && !isGhostPhase && !isDashing) {
                                let pAng = p.getState('angle') || 0;
                                let ang = Math.atan2(e.y - cy, e.x - px);
                                let diff = Math.abs(ang - pAng);
                                if (diff > Math.PI) diff = Math.PI * 2 - diff;
                                if (diff < 0.7) {
                                    isHit = true;
                                    targetPlayerAngle = pAng;
                                }
                            }
                        });
                    } else {
                        const ang = Math.atan2(e.y - cy, e.x - cx);
                        let diff = Math.abs(ang - mouseAngle);
                        if (diff > Math.PI) diff = Math.PI * 2 - diff;
                        if (diff < 0.7) isHit = true;
                    }

                    if (isHit) {
`;

code = code.replace(/if \(\!e\.isReflected && dist < 85 && dist > 55 && \!isGhostPhase && \!isDashing\) \{[\s\S]*?if \(diff < 0\.7\) \{/m, collisionLogic);


fs.writeFileSync('index.html', code);
