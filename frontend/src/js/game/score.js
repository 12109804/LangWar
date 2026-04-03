// スコアの追加
export let score = 0;
export let combo = 0;

export function addScore(Lines) {
    const table = [0, 1000, 3000, 5000, 10000];

    // 基本スコア
    let base = table[Lines];

    // コンボ倍率（１回目は１倍、２回目は２倍、３倍...）
    let bonus = base * combo;
    score += base + bonus;
}

// コンボ関数
export function increaseCombo() {
    combo++;
}
// コンボリセット関数
export function resetCombo() {
    combo = 0;
}

// スコアリセット関数
export function resetScore() {
    score = 0;
    combo = 0;
}