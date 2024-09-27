// 游戏基本设置
const 玩家1英雄列表 = [];
const 玩家2英雄列表 = [];
let 波次数 = 0;
let 升级成本 = 10;
let 玩家1金币 = 100;
let 玩家2金币 = 100;

// 获取 HTML 元素
const 玩家1英雄显示区域 = document.getElementById('玩家1英雄列表');
const 玩家2英雄显示区域 = document.getElementById('玩家2英雄列表');
const 召唤玩家1英雄按钮 = document.getElementById('召唤玩家1英雄');
const 召唤玩家2英雄按钮 = document.getElementById('召唤玩家2英雄');
const 开始波次按钮 = document.getElementById('开始波次');
const 召唤BOSS按钮 = document.getElementById('召唤BOSS');
const 当前波次数显示 = document.getElementById('当前波次数');
const 玩家1金币数显示 = document.getElementById('玩家1金币数');
const 玩家2金币数显示 = document.getElementById('玩家2金币数');

// 英雄类
class 英雄 {
    constructor(名称, 品质, 等级 = 1, 攻击力, 生命值) {
        this.名称 = 名称;
        this.品质 = 品质;
        this.等级 = 等级;
        this.攻击力 = 攻击力;
        this.生命值 = 生命值;
    }
}

// 怪物类
class 怪物 {
    constructor(名称, 生命值, 速度) {
        this.名称 = 名称;
        this.生命值 = 生命值;
        this.速度 = speed;
        this.位置 = 0; // 表示怪物在路径上的位置
    }

    移动() {
        this.位置 += this.速度; // 假设每次调用此方法移动一定距离
    }
}

// 生成怪物函数
const 怪物列表 = [];
function 生成怪物() {
    const 怪物名称列表 = ['小怪兽', '中怪兽', '大怪兽'];
    const 怪物实例 = new 怪物(怪物名称列表[Math.floor(Math.random() * 怪物名称列表.length)], 100 + 波次数 * 10, 1 + 波次数 * 0.1);
    怪物列表.push(怪物实例);
    玩家1金币 += 5; // 击败每个怪物给予金币
}

// 召唤英雄的函数
function 召唤英雄(玩家编号) {
    const 英雄名称列表 = ['苹果', '香蕉', '书', '笔'];  // 简化的英雄名称
    const 随机英雄名称 = 英雄名称列表[Math.floor(Math.random() * 英雄名称列表.length)];
    const 品质列表 = ['白', '蓝', '紫', '金'][Math.floor(Math.random() * 4)];
    const 攻击力和生命值数据 = {
        '白': { 攻击力: 5, 生命值: 20 },
        '蓝': { 攻击力: 10, 生命值: 40 },
        '紫': { 攻击力: 15, 生命值: 60 },
        '金': { 攻击力: 20, 生命值: 100 }
    };
    const 英雄实例 = new 英雄(random英雄名称, 品质列表, 1, 攻击力和生命值数据[品质列表].攻击力, 攻击力和生命值数据[品质列表].生命值);
    if (玩家编号 === 1) {
        玩家1英雄列表.push(英雄实例);
        渲染英雄列表(玩家1英雄列表, 玩家1英雄显示区域);
    } else {
        玩家2英雄列表.push(英雄实例);
        渲染英雄列表(玩家2英雄列表, 玩家2英雄显示区域);
    }
}

// 渲染英雄到界面，并添加升级按钮
function 渲染英雄列表(英雄列表, 显示区域) {
    显示区域.innerHTML = ''; // 清空区域
    英雄列表.forEach(英雄实例 => {
        const 英雄元素 = document.createElement('div');
        英雄元素.classList.add('英雄');
        英雄元素.innerHTML = `${英雄实例.名称}<br><strong>品质：</strong>${英雄实例.品质}<br><strong>等级：</strong>${英雄实例.等级}`;
        const 升级按钮 = document.createElement('button');
        升级按钮.classList.add('升级按钮');
        升级按钮.textContent = `升级（${升级成本}）`;
        升级按钮.addEventListener('click', () => 升级英雄(英雄实例));
        英雄元素.appendChild(升级按钮);
        显示区域.appendChild(英雄元素);
    });
}

// 升级英雄的函数（更新金币逻辑）
function 升级英雄(英雄实例) {
    if (玩家1金币 >= 升级成本) {
        英雄实例.等级++;
        玩家1金币 -= 升级成本; // 扣除金币
        升级成本 += 10; // 每次升级后增加升级成本
        渲染英雄列表([英雄实例], 英雄实例.parentElement.parentElement);
        更新金币显示(); // 更新显示
    } else {
        alert('金币不足！');
    }
}

// 更新金币显示函数
function 更新金币显示() {
    玩家1金币数显示.innerText = 玩家1金币;
    玩家2金币数显示.innerText = 玩家2金币;
}

// 开始新波次
function 开始新波次() {
    波次数++;
    当前波次数显示.innerText = 波次数;
    alert(`开始第 ${波次数} 波！`);
    const 生命值 = 100 + 波次数 * 10; // 随波次增加生命值
    const 速度 = 1 + 波次数 * 0.1;    // 随波次增加速度
    生成怪物(生命值, 速度);
    setInterval(() => {
        怪物列表.forEach(怪物实例 => {
            怪物实例.移动();
            // 在这里可以添加绘制怪物的逻辑
        });
    }, 1000); // 每秒更新
}

// BOSS 机制示例
function 召唤BOSS() {
    const boss = new 怪物('超级BOSS', 500 + 波次数 * 50, 1); // BOSS 有更高的生命值和速度
    怪物列表.push(boss);
    alert('BOSS 已召唤！');
}

// 绑定按钮事件
召唤玩家1英雄按钮.addEventListener('click', () => 召唤英雄(1));
召唤玩家2英雄按钮.addEventListener('click', () => 召唤英雄(2));
开始波次按钮.addEventListener('click', 开始新波次);
召唤BOSS按钮.addEventListener('click', 召唤BOSS);

// 绑定初始更新金币显示
更新金币显示();

// 初始化游戏
function 初始化游戏() {
    玩家1英雄显示区域.innerHTML = '';
    玩家2英雄显示区域.innerHTML = '';
    波次数 = 0;
    升级成本 = 10;
}

初始化游戏();
