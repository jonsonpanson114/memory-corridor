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
  chapter2: {
    id: 'chapter2',
    title: '時計塔の秘密',
    mnemonicType: 'number',
    sessions: [
      {
        id: 'chapter2-session1',
        chapterId: 'chapter2',
        sessionNumber: 1,
        storyText: `六日目の夢は、音から始まった。

カチ、カチ、カチ——

規則正しい音。
でも、それは途中で止まっていた。
止まった場所で、何かが待っているような気がした。

館の中が、また変わっていた。
廊下の突き当たりに、螺旋階段があった。
昨日まで、そこには壁しかなかったはずだ。

ミラは階段の一番下に立っていた。
上を見上げながら。

「気づいていましたか。あの音に。」

うなずいた。
夢の中に入った瞬間から、聞こえていた。

「時計塔です。館の中でも、古い場所。
　あなたが長い間、近づかなかった場所。」

「近づかなかった」——意図的に、ということだろうか。

「上がってみますか。」

螺旋階段を上ると、小さな部屋があった。

部屋の中央に、大きな時計があった。
振り子が、止まっていた。
文字盤には埃が積もっていたが——
針がどこを指しているかは、はっきりわかった。

午後三時十七分。

その時刻を見た瞬間、何かが動いた。
体の奥の方で。記憶ではなく——感覚として。

午後三時十七分。
その数字を、どこかで知っている。

「どうでしたか。」

階段を下りながら、答えを考えた。
「午後三時十七分に、何かがあった」
それだけはわかった。でも、何が——

「数字は、記憶の鍵になることがあります。」

「日付、時刻、年齢——人はそういうものを、感情と一緒に覚えている。
　だから数字を思い出せると、感情も戻ってくる。」

ミラは時計塔を見上げた。
その目に、何かが映っていた。

「今日は——数字の覚え方を教えます。」`,
        choices: [
          { id: 'together', text: '一緒に来てくれますか' },
          { id: 'alone', text: '一人で行きます' },
        ],
        trainingData: [
          { id: 'item1', content: '317', type: 'number' },
          { id: 'item2', content: '509', type: 'number' },
          { id: 'item3', content: '864', type: 'number' },
          { id: 'item4', content: '291', type: 'number' },
          { id: 'item5', content: '735', type: 'number' },
        ],
      },
      {
        id: 'chapter2-session2',
        chapterId: 'chapter2',
        sessionNumber: 2,
        storyText: `七日目。

夢に入った瞬間、時計の音がした。
でも昨日より少しだけ——ゆっくりだった気がした。

あるいは、僕が時計の音に慣れたのかもしれない。

ミラは時計塔の前に、小さなテーブルを置いていた。
テーブルの上に、紙と鉛筆が並んでいた。

「数字は、そのままでは記憶しにくい。
　0から9まで——どれも似たような形をしている。」

「でも、音に変えると、言葉になる。
　言葉になると、映像になる。
　映像になると——忘れない。」

『数字変換法（Major System）の基本

0 = s, z の音　（ゼロのz）
1 = t, d の音　（縦棒が1本）
2 = n の音　　（縦棒が2本）
3 = m の音　　（縦棒が3本）
4 = r の音　　（fourのr）
5 = l の音　　（手のひらを広げると5本指でLの形）
6 = j, sh の音　（6をひっくり返すとj）
7 = k, g の音　（7の角）
8 = f, v の音　（8の曲線）
9 = p, b の音　（9をひっくり返すとp）

母音・h・w・y は使わない（飾り文字として自由に使える）

例：
31 = m + t = 「まと（的）」
317 = m + t + k = 「まとか（真床か）」→「真冬の家」など』

「最初は覚えにくいかもしれない。
　でも一度覚えると——数字が、映像に見えてくる。」

「3は m の音。なぜなら m は縦棒が3本だから。
　1は t の音。縦棒が1本だから。」

ミラは紙に「317」と書いた。

「3・1・7——m、t、k の音。
　何か言葉が作れますか。」`,
        choices: [
          { id: 'madoka', text: '……『まどか』みたいな？' },
          { id: 'difficult', text: '難しい。すぐには出てこない' },
        ],
        trainingData: [
          { id: 'item1', content: '603', type: 'number' },
          { id: 'item2', content: '927', type: 'number' },
          { id: 'item3', content: '154', type: 'number' },
          { id: 'item4', content: '818', type: 'number' },
          { id: 'item5', content: '396', type: 'number' },
          { id: 'item6', content: '742', type: 'number' },
        ],
      },
    ],
  },
  chapter3: {
    id: 'chapter3',
    title: '霧の図書館',
    mnemonicType: 'link',
    sessions: [
      {
        id: 'chapter3-session1',
        chapterId: 'chapter3',
        sessionNumber: 1,
        storyText: `十一日目の夢は、白い霧から始まった。

館がある——はずだった。
でも霧が濃くて、輪郭が見えなかった。

歩いていくと、ふいに大きな扉が現れた。
木製の、重そうな扉。
金属の取っ手に、埃が積もっている。

扉の上に、小さなプレートがあった。
「図書館」と書いてある。`,
        choices: [
          { id: 'find_books', text: 'あの人の本はここにありますか' },
          { id: 'why_fog', text: 'なぜ霧がかかっているんですか' },
        ],
        trainingData: [
          { id: 'item1', content: '青いペン', type: 'word' },
          { id: 'item2', content: '赤いリボン', type: 'word' },
          { id: 'item3', content: '黒いノート', type: 'word' },
          { id: 'item4', content: '銀のペンケース', type: 'word' },
          { id: 'item5', content: '古い地図', type: 'word' },
        ],
      },
      {
        id: 'chapter3-session2',
        chapterId: 'chapter3',
        sessionNumber: 2,
        storyText: `十二日目。

霧が少しだけ晴れてきた。
でも——図書館の中はまだ、見えないような気がした。

ミラは本棚の間に立っていた。
背表紙を指でなぞっていた。

「ここは——記憶の図書館です。」

「あなたが経験したこと、感じたこと、出会った人——
　全部、ここに収められています。」

見渡すと、天井まで届く本棚が、どこまでも続いていた。
でも——霧がかかっていて、奥が見えなかった。

「霧が濃いのは、まだ思い出せていない部分が多いからです。
　記憶が戻るほど、霧が晴れます。」`,
        choices: [
          { id: 'find_books', text: 'あの人の本はここにありますか' },
          { id: 'why_fog', text: 'なぜ霧がかかっているんですか' },
        ],
        trainingData: [
          { id: 'item1', content: '写真集', type: 'word' },
          { id: 'item2', content: '手紙', type: 'word' },
          { id: 'item3', content: '絵本', type: 'word' },
          { id: 'item4', content: '雑誌', type: 'word' },
          { id: 'item5', content: '日記帳', type: 'word' },
          { id: 'item6', content: '栞', type: 'word' },
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
