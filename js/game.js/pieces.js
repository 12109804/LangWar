// shape 定義,pieces生成ロジック
export const PIECES = [
    {
        name: "I",
        shape: [[1,1,1,1]], 
    },
    {
        name: "O",
        shape: [
            [1,1],
            [1,1]
        ] 
    },
    {
        name: "T",
        shape: [
            [0,1,0],
            [1,1,1]
        ]
    }, 
    {
        name: "L",
        shape: [
            [1,0,0],
            [1,0,0],
            [1,1,0]
        ]
    }
]