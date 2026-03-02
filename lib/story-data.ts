import type { Chapter } from '@/types/story'

export const CHAPTERS: Record<string, Chapter> = {
  chapter1: {
    id: 'chapter1',
    title: '館の扉',
    mnemonicType: 'palace',
    sessions: [
      {
        id: 'chapter1-session1',
        chapterId: 'chapter1',
        sessionNumber: 1,
        storyText: `目が覚めると、僕は自分の名前を思い出せなかった。

天井は古い木材で組まれていて、どこかの隙間から夜の光が落ちている。
体を起こすと、見知らぬ部屋だとわかった。でも——妙に懐かしかった。

ベッドの脇のテーブルに、一枚の紙が置いてある。

『記憶を取り戻したければ、館の奥へ進め。
  ただし——忘れるな。
  ここはお前が作った場所だ。』

意味がわからなかった。
「僕が作った場所」という言葉だけが、頭の中で妙な重さを持った。

廊下に出ると、遠くで何かが燃えているような匂いがした。
蝋燭の匂い。燻んだ紙の匂い。

そして——誰かの気配。

廊下の突き当たりに、女性が立っていた。
黒い髪が背中まで伸びている。白いワンピース。
窓の外の暗闇を、ただ静かに見ていた。

「来ると思っていました。」

振り返らないまま、彼女は言った。声は低く、穏やかだった。

「遅かったですね。もう少し早く目が覚めると思っていた。」

僕は何も言えなかった。`,
        choices: [
          { id: 'ask_who', text: 'あなたは誰ですか' },
          { id: 'ask_where', text: 'ここはどこですか' },
        ],
        trainingData: [
          { id: 'item1', content: '古びた油絵（赤い花が描かれている）', type: 'place' },
          { id: 'item2', content: '青い磁器の花瓶', type: 'place' },
          { id: 'item3', content: '黒檀の小箱', type: 'place' },
          { id: 'item4', content: '銀の懐中時計', type: 'place' },
          { id: 'item5', content: '古い手紙', type: 'place' },
        ],
      },
      {
        id: 'chapter1-session2',
        chapterId: 'chapter1',
        sessionNumber: 2,
        storyText: `昨日、僕は五枚の絵を記憶した。
今日もまた、夢の中で館に戻ってきた。

廊下はまだ薄暗かった。
でも昨日より、少しだけ景色が見えた。

柱の傷。窓の外の枯れた庭。
壁紙の剥がれた模様が、何かの地図に見えた。

ミラはいつもの場所にいた。
今日は窓ではなく、古い本棚の前に立っていた。

「覚えていますか。昨日の絵。」

僕はうなずいた。
……正確には、覚えているつもりだった。

「ちゃんと自分の場所に置きましたか？」

「記憶というのは不思議なもので——置く場所を間違えると、二度と見つからなくなる。」

ミラは本棚から古い本を一冊取り出した。
表紙には何も書いていなかった。

「これを読むといい。場所と記憶の話が書いてある。」

『古代ギリシャの弁論家シモニデスは、宴会の途中で席を外した。
  その直後、建物が崩れ落ちた。
  遺体は判別がつかないほどに潰れていたが——
  シモニデスは、誰がどこに座っていたかを正確に思い出すことができた。

  場所が、顔を保存していたのだ。

  それ以来、記憶術者たちは「場所」を使って記憶を保存するようになった。
  宮殿でも、街でも、廊下でも——歩ける場所なら、どこでも記憶の器になる。』`,
        choices: [
          { id: 'is_real', text: 'これは本当の話ですか' },
          { id: 'why_know', text: 'なぜあなたはこれを知っているんですか' },
        ],
        trainingData: [
          { id: 'item1', content: '壊れた陶器', type: 'place' },
          { id: 'item2', content: '錆びた鍵', type: 'place' },
          { id: 'item3', content: '古い地図', type: 'place' },
          { id: 'item4', content: '黒い羽', type: 'place' },
          { id: 'item5', content: 'ガラスの小瓶', type: 'place' },
          { id: 'item6', content: '壊れた時計', type: 'place' },
          { id: 'item7', content: '古い写真', type: 'place' },
        ],
      },
    ],
  },
}

export function getChapter(chapterId: string): Chapter | undefined {
  return CHAPTERS[chapterId]
}

export function getSession(chapterId: string, sessionNumber: number) {
  const chapter = getChapter(chapterId)
  if (!chapter) return undefined
  return chapter.sessions.find((s) => s.sessionNumber === sessionNumber)
}
