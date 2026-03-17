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
窓の外の暗闘を、ただ静かに見ていた。

「来ると思っていました。」

振り返らないまま、彼女は言った。声は低く、穏やかだった。

「遅かったですね。もう少し早く目が覚めると思っていた。」

僕は何も言えなかった。`,
        choices: [
          { id: 'ask_who', text: 'あなたは誰ですか' },
          { id: 'ask_where', text: 'ここはどこですか' },
        ],
        trainingData: [
          { id: 'item1', content: '銀色の鍵', type: 'place' },
          { id: 'item2', content: '青い革の表紙の本', type: 'place' },
          { id: 'item3', content: '真鍮のベル', type: 'place' },
          { id: 'item4', content: '枯れた白い花', type: 'place' },
          { id: 'item5', content: '封の開いた手紙', type: 'place' },
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

ミラはいつもの場所に従った。
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
          { id: 'item1', content: '割れたティーカップ', type: 'place' },
          { id: 'item2', content: '錆びたペン先', type: 'place' },
          { id: 'item3', content: '折りたたまれた地図', type: 'place' },
          { id: 'item4', content: '黒い鴉の羽', type: 'place' },
          { id: 'item5', content: '琥珀色の小瓶', type: 'place' },
          { id: 'item6', content: '動かない懐中時計', type: 'place' },
          { id: 'item7', content: '誰かの古い写真', type: 'place' },
        ],
      },
      {
        id: 'chapter1-session3',
        chapterId: 'chapter1',
        sessionNumber: 3,
        storyText: `三日目の夢は、少し違った。

館が、前より広かった。
いや——広くなったのではなく、見えていなかっただけかもしれない。

廊下の奥に、新しい扉があった。
昨日まで気づかなかった。あるいは、なかったのか。

ミラは扉のそばに立っていた。
「気づきましたか、新しい扉に。
  記憶が戻ると、見えるものが増えます。
  館は——あなたの記憶そのものですから。」

扉の先には行けません。まだ。
でも——今日は、音が聞こえるかもしれない。

ミラは扉に耳を当てた。僕も近づいた。
扉の向こうから、かすかに声がした。
誰かの声。知っているような気がする声。
親しげで、でも切ない響き。

「また、来てね」

その言葉が聞こえた気がした。
でも、扉は固く閉ざされたままだった。`,
        choices: [
          { id: 'who_voice', text: 'あの声は誰ですか' },
          { id: 'disappeared', text: 'もっとよく聞こうとしたら、消えた' },
        ],
        trainingData: [
          { id: 'item1', content: '銀の鈴', type: 'word' },
          { id: 'item2', content: '赤いリボン', type: 'word' },
          { id: 'item3', content: '枯れたバラ', type: 'word' },
          { id: 'item4', content: '真鍮の天秤', type: 'word' },
          { id: 'item5', content: '羊皮紙の巻物', type: 'word' },
        ],
      },
      {
        id: 'chapter1-session4',
        chapterId: 'chapter1',
        sessionNumber: 4,
        storyText: `四日目。

起きると、昨日の声がまだ耳に残っていた。
夢と現実の境界が、少しずつ曖昧になってきた。
それが怖いのか、心地いいのか、自分でもわからなかった。

館はまた広くなっていた。
廊下の左に、新しい部屋があった。
扉は半開きになっていて、中から光が漏れていた。

ミラが僕に問いかけた。
「今日は、聞いてもいいですか。
  あなたは——本当に、思い出したいんですか。

  思い出すということは、忘れたかったことも、戻ってくるということです。
  それでも、ですか。」`,
        choices: [
          { id: 'want_to_remember', text: '思い出したい。だから来ている。' },
          { id: 'not_sure', text: 'わからない。でも、ここにいる。' },
        ],
        trainingData: [
          { id: 'item1', content: '窓にかかった白いカーテン', type: 'word' },
          { id: 'item2', content: '湯気の立つスープ皿', type: 'word' },
          { id: 'item3', content: '使い古した木の椅子', type: 'word' },
          { id: 'item4', content: '誰かの背中の影', type: 'word' },
          { id: 'item5', content: '朝陽の差すテーブル', type: 'word' },
        ],
      },
      {
        id: 'chapter1-session5',
        chapterId: 'chapter1',
        sessionNumber: 5,
        storyText: `五日目。

館が、また広くなっていた。
今日は廊下全体が見えた。
最初の夜、暗くてわからなかった場所に、いくつもの扉があることがわかった。

ミラは廊下の中央に立っていた。
「今日で、第一章が終わります。
  扉の向こうには、あなたが最も強く覚えている場所があります。
  そしてその場所に、あなたが最も避けてきた記憶がある。

  行ってきてください。私はここで待っています。」

記憶が、この扉を開ける鍵になる。
僕は自分の宮殿を信じて、一歩踏み出した。`,
        choices: [
          { id: 'trust_palace', text: '自分の記憶を信じる' },
          { id: 'ask_mira', text: 'ミラは、僕自身なんですか' },
        ],
        trainingData: [
          { id: 'item1', content: '思い出の黄金の鍵', type: 'word' },
          { id: 'item2', content: '開かれた重い石扉', type: 'word' },
          { id: 'item3', content: '温かな午後の光', type: 'word' },
          { id: 'item4', content: 'まどかの本当の笑顔', type: 'word' },
          { id: 'item5', content: 'ミラの静かな微笑', type: 'word' },
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
「気づいていましたか。あの音に。
　時計塔です。館の中でも、古い場所。
　あなたが長い間、近づかなかった場所。」

螺旋階段を上ると、小さな部屋があった。
部屋の中央に、大きな時計があった。
振り子が、止まっていた。

午後三時十七分。

その時刻を見た瞬間、何かが動いた。
317。その数字を、どこかで知っている。`,
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
ミラは時計塔の前に、小さなテーブルを置いていた。

「数字は、そのままでは記憶しにくい。
　でも、音に変えると、言葉になる。
　言葉になると、映像になる。映像になると——忘れない。」

『数字変換法（Major System）の基本
  0=s/z, 1=t/d, 2=n, 3=m, 4=r, 5=l, 6=j/sh, 7=k/g, 8=f/v, 9=p/b』

「317——m、t、k の音。
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
        ],
      },
      {
        id: 'chapter2-session3',
        chapterId: 'chapter2',
        sessionNumber: 3,
        storyText: `八日目。

時計塔の音が、また少し変わった。
規則正しいリズムの中に——一拍だけ、ズレがある。

ミラは今日、時計塔の中にいた。
「……昨日、『まどか』という言葉が出てきましたね。
  その言葉を聞いたとき、何か感じましたか。」

そういう感覚が、記憶が戻るときの兆しだという。
「あなたはその名前を知っていますか」
ミラは少し間を置いた。「……知っています。でも、私の口から言うべきではない。」`,
        choices: [
          { id: 'you_know', text: 'あなたはその名前を知っていますか' },
          { id: 'why_bother', text: 'なぜその数字がそんなに気になるんですか' },
        ],
        trainingData: [
          { id: 'item1', content: '109', type: 'number' },
          { id: 'item2', content: '482', type: 'number' },
          { id: 'item3', content: '765', type: 'number' },
          { id: 'item4', content: '358', type: 'number' },
          { id: 'item5', content: '241', type: 'number' },
        ],
      },
      {
        id: 'chapter2-session4',
        chapterId: 'chapter2',
        sessionNumber: 4,
        storyText: `九日目の夢は、秋の匂いから始まった。

金木犀——だと思う。
ミラは中庭の、枯れかけた金木犀の木の前に立っていた。

「この木が咲くのは——秋です。
　あなたの記憶の中で、この匂いと一緒に刻まれている日があります。
　317——三月十七日ではなく。秋の、ある日。」

ミラの目が、何かをこらえているようだった。
「あなたが——誰かと別れた日です。」`,
        choices: [
          { id: 'what_happened', text: 'その日に、何があったんですか' },
          { id: 'i_know_this', text: 'その木、知っている気がします' },
        ],
        trainingData: [
          { id: 'item1', content: '1017', type: 'number' },
          { id: 'item2', content: '1103', type: 'number' },
          { id: 'item3', content: '0922', type: 'number' },
          { id: 'item4', content: '1225', type: 'number' },
        ],
      },
      {
        id: 'chapter2-session5',
        chapterId: 'chapter2',
        sessionNumber: 5,
        storyText: `十日目。

金木犀の匂いが、昨日より濃かった。
時計塔の音が——今日は、動いていた。

「感情は、一番強い記憶の錨です。
　理屈で覚えた記憶は薄れるが、感情と一緒に刻まれた記憶は何年経っても消えない。

　あの日付を——感情と一緒に、覚えてください。
　それが、扉を開ける最後の鍵です。」`,
        choices: [
          { id: 'remember_with_emotion', text: '感情と一緒に、刻み込む' },
          { id: 'trust_yourself', text: '自分を信じて進む' },
        ],
        trainingData: [
          { id: 'item1', content: '317', type: 'number' },
          { id: 'item2', content: '1017', type: 'number' },
          { id: 'item3', content: '1103', type: 'number' },
          { id: 'item4', content: '1225', type: 'number' },
          { id: 'item5', content: '0922', type: 'number' },
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

歩いていくと、ふいに大きな扉が現れた。
「図書館」と書いてある。

扉を開けると、ミラがいた。
「ここは——記憶の図書館です。あなたが経験したこと、感じたこと、出会った人——全部、ここに収められています。」

本棚の奥から、年配の男が現れた。
「管理、というより——守ってきた、と言いたいですな。特に、あなたが近づかないようにしていた棚を。」`,
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

「連想法（Link Method）をご存知ですか」
ノアが言った。
「無関係なものを、物語で繋ぐんです。
  『リンゴ』『電車』『傘』なら、『リンゴを持った男が電車に乗ったら、窓から傘が飛んできた』という話にする。

  記憶とは——自分が経験したことを、自分なりの物語に編集したものです。」`,
        choices: [
          { id: 'memory_is_story', text: '記憶と物語は、同じものですか' },
          { id: 'is_mira_part', text: 'ミラも物語の一部ですか' },
        ],
        trainingData: [
          { id: 'item1', content: '写真集', type: 'word' },
          { id: 'item2', content: '手紙', type: 'word' },
          { id: 'item3', content: '絵本', type: 'word' },
          { id: 'item4', content: '雑誌', type: 'word' },
          { id: 'item5', content: '日記帳', type: 'word' },
        ],
      },
      {
        id: 'chapter3-session3',
        chapterId: 'chapter3',
        sessionNumber: 3,
        storyText: `十三日目。

図書館の霧が晴れ、鎖のかかった棚が見えた。
「あの棚には——あなたが一番強く封印した記憶があります。鎖は、あなた自身がかけた。」

ミラが静かに割り込んだ。
「あの棚の中の記憶は——悲しいものです。でも、恥ずかしいものではない。
  あなたが封印したのは、弱さからじゃない。そのことだけ——先に伝えておきたかった。」`,
        choices: [
          { id: 'know_content', text: 'あの棚に何が入っているか、知っていますか' },
          { id: 'why_seal', text: 'なぜ僕はそれを封印したんですか' },
        ],
        trainingData: [
          { id: 'item1', content: '重い鎖', type: 'word' },
          { id: 'item2', content: '錆びた鍵', type: 'word' },
          { id: 'item3', content: '古い日記', type: 'word' },
          { id: 'item4', content: '枯れた花弁', type: 'word' },
          { id: 'item5', content: '破れたページ', type: 'word' },
        ],
      },
      {
        id: 'chapter3-session4',
        chapterId: 'chapter3',
        sessionNumber: 4,
        storyText: `十四日目。

ミラが「あの人」のことを話し始めた。
「あの人は——明るい人でした。
  あなたが落ち込んでいるとき、何も言わずに隣に座っていた。それだけで十分だった、という顔をして。

  あなたの記憶が紡ぐ物語の中で、その人はいつも笑っています。」

ミラが能動的に過去を語るのは、これが初めてだった。`,
        choices: [
          { id: 'listen_more', text: 'もっと聞かせてください' },
          { id: 'feel_same', text: '僕も、そんな気がします' },
        ],
        trainingData: [
          { id: 'item1', content: '窓際の席', type: 'word' },
          { id: 'item2', content: '午後の紅茶', type: 'word' },
          { id: 'item3', content: '開かれた本', type: 'word' },
          { id: 'item4', content: '静かな微笑', type: 'word' },
          { id: 'item5', content: '重なる影', type: 'word' },
        ],
      },
      {
        id: 'chapter3-session5',
        chapterId: 'chapter3',
        sessionNumber: 5,
        storyText: `十五日目。

封印された棚が開いた。
中には金木犀の色の本。一ページ目には写真が挟まっていた。

女性だった。笑っていた。顔はまだ霧に包まれている。
でも——笑い方を、知っている気がした。

「また、来てね」
その声が、写真の中から聞こえたような気がした。`,
        choices: [
          { id: 'open_shelf', text: '棚を開けて、中を見る' },
          { id: 'with_mira', text: 'ミラと一緒に見たい' },
        ],
        trainingData: [
          { id: 'item1', content: '金木犀の本', type: 'word' },
          { id: 'item2', content: '古い写真', type: 'word' },
          { id: 'item3', content: '誰かの笑顔', type: 'word' },
          { id: 'item4', content: '温かな記憶', type: 'word' },
          { id: 'item5', content: '司書の丸眼鏡', type: 'word' },
        ],
      },
    ],
  },
  chapter4: {
    id: 'chapter4',
    title: '廃墟の庭園',
    mnemonicType: 'story',
    sessions: [
      {
        id: 'chapter4-session1',
        chapterId: 'chapter4',
        sessionNumber: 1,
        storyText: `十六日目の夢は、土の匂いから始まった。

「ここは——あなたが最も長く避けてきた場所です。図書館の封印された棚より、さらに奥。
  でも、今のあなたなら、入れる。」

庭を歩いていると、ある場所で足が止まった。
「ここに——何かが埋まっています。あなたが埋めた。」`,
        choices: [
          { id: 'what_buried', text: '何が埋まっているか、わかりますか' },
          { id: 'scared', text: '怖い気がします' },
        ],
        trainingData: [
          { id: 'item1', content: '台所の朝', type: 'story' },
          { id: 'item2', content: '秋の午後', type: 'story' },
          { id: 'item3', content: '金木犀の香り', type: 'story' },
          { id: 'item4', content: '誰かの声', type: 'story' },
          { id: 'item5', content: '誰かの目', type: 'story' },
        ],
      },
      {
        id: 'chapter4-session2',
        chapterId: 'chapter4',
        sessionNumber: 2,
        storyText: `十七日目。

ミラが「ストーリー法」について語る。
「単語を繋ぐだけではなく——経験したことを、意味のある物語として再構成する技術です。

  作り直すのではなく——散らばったピースを、正しい順番に並べることです。
  元の絵は、あなたの中にある。」`,
        choices: [
          { id: 'remake_memory', text: '記憶を「作り直す」ことになりませんか' },
          { id: 'mira_memory', text: 'あなたとの記憶も、ここに？' },
        ],
        trainingData: [
          { id: 'item1', content: '秋の日', type: 'story' },
          { id: 'item2', content: '金木犀の木の下', type: 'story' },
          { id: 'item3', content: '誰かが待っている', type: 'story' },
          { id: 'item4', content: '手紙を読む', type: 'story' },
          { id: 'item5', content: '庭に埋める', type: 'story' },
        ],
      },
      {
        id: 'chapter4-session3',
        chapterId: 'chapter4',
        sessionNumber: 3,
        storyText: `十八日目。

土の中から小さな箱が出てきた。中には一通の手紙。
『もし思い出したくなったら、そのときはまた、話しましょう。待っています。』

差出人の名前は、一文字目だけ読めた。——「ま」

ミラが初めて、背を向けた。背中がわずかに震えていた。`,
        choices: [
          { id: 'read_letter', text: '手紙を読み進める' },
          { id: 'read_with_mira', text: 'ミラと一緒に読む' },
        ],
        trainingData: [
          { id: 'item1', content: '土の体温', type: 'story' },
          { id: 'item2', content: '小さな木箱', type: 'story' },
          { id: 'item3', content: '白い便箋', type: 'story' },
          { id: 'item4', content: '懐かしい筆跡', type: 'story' },
          { id: 'item5', content: '「待っています」', type: 'story' },
        ],
      },
      {
        id: 'chapter4-session4',
        chapterId: 'chapter4',
        sessionNumber: 4,
        storyText: `十九日目。

ミラがベンチで泣いていた。
「私は——あの人のことが、好きでした。あなたの記憶の中で生まれた存在が、あなたの記憶の中にいる人を、好きになる。変でしょう。」

ミラが初めて明確に感情を崩した夜だった。`,
        choices: [
          { id: 'next_to_mira', text: '隣に座る' },
          { id: 'stay_there', text: 'そのまま見守る' },
        ],
        trainingData: [
          { id: 'item1', content: 'ベンチの二人', type: 'story' },
          { id: 'item2', content: '震える背中', type: 'story' },
          { id: 'item3', content: 'ミラの告白', type: 'story' },
          { id: 'item4', content: '重なる時間', type: 'story' },
          { id: 'item5', content: '誓いの言葉', type: 'story' },
        ],
      },
      {
        id: 'chapter4-session5',
        chapterId: 'chapter4',
        sessionNumber: 5,
        storyText: `二十日目。

物語が完成した瞬間、庭の植物が一斉に咲いた。
そして、記憶の中に顔が浮かんだ。

ミラが、ついにその名を呼んだ。
「——まどか。」`,
        choices: [
          { id: 'madoka_revealed', text: 'その名前を、噛みしめる' },
          { id: 'mira_smiles', text: 'ミラを見る' },
        ],
        trainingData: [
          { id: 'item1', content: '咲き誇る金木犀の森', type: 'story' },
          { id: 'item2', content: '微笑むまどかの肖像', type: 'story' },
          { id: 'item3', content: '一本に繋がった物語', type: 'story' },
          { id: 'item4', content: 'ミラとまどかの対話', type: 'story' },
          { id: 'item5', content: '真実がもたらす重み', type: 'story' },
        ],
      },
    ],
  },
  chapter5: {
    id: 'chapter5',
    title: '鏡の回廊',
    mnemonicType: 'palace',
    sessions: [
      {
        id: 'chapter5-session1',
        chapterId: 'chapter5',
        sessionNumber: 1,
        storyText: `二十一日目。

鏡の回廊。ミラの鏡像には、まどかが映っていた。
「ミラはまどかではない。でも——まどかが、あなたの記憶の中に残したものです。」

まどかは二つの意味で待っていた。記憶の中で、そして——現実でも。`,
        choices: [
          { id: 'mira_is_madoka', text: 'ミラは——まどかですか' },
          { id: 'who_in_mirror', text: '鏡の中の人は、誰ですか' },
        ],
        trainingData: [
          { id: 'item1', content: '317', type: 'number' },
          { id: 'item2', content: '1017', type: 'number' },
          { id: 'item3', content: '1103', type: 'number' },
          { id: 'item4', content: '1225', type: 'number' },
          { id: 'item5', content: '0922', type: 'number' },
        ],
      },
      {
        id: 'chapter5-session2',
        chapterId: 'chapter5',
        sessionNumber: 2,
        storyText: `二十二日目。

ミラがまどかの記憶を語る。
「まどかは最初、記憶術を馬鹿にしていました。でも——あなたが教えると、真剣にやった。そして、あなたより先に上手くなった。」

楽しい記憶を、通り道に置いておいた。まどかの優しさがそこにあった。`,
        choices: [
          { id: 'remember_young', text: 'それを覚えています' },
          { id: 'why_left', text: 'なぜまどかはそれを残したんでしょう' },
        ],
        trainingData: [
          { id: 'item1', content: '22', type: 'number' },
          { id: 'item2', content: '105', type: 'number' },
          { id: 'item3', content: '99', type: 'number' },
          { id: 'item4', content: '417', type: 'number' },
          { id: 'item5', content: '888', type: 'number' },
        ],
      },
      {
        id: 'chapter5-session3',
        chapterId: 'chapter5',
        sessionNumber: 3,
        storyText: `二十三日目。

病院の廊下。消毒の匂い。まどかが椅子に座っていた。
「来てくれたんだ。」

声が、はっきり聞こえた。「また来てね」と言った声と、同じ声。
でも、扉を出るとミラが待っていた。彼女はあの日の中には入れない。`,
        choices: [
          { id: 'ask_go_together', text: 'ミラも一緒に来てくれますか' },
          { id: 'go_alone', text: '一人で行けます' },
        ],
        trainingData: [
          { id: 'item1', content: '317', type: 'number' },
          { id: 'item2', content: '1017', type: 'number' },
          { id: 'item3', content: '1225', type: 'number' },
          { id: 'item4', content: '0901', type: 'number' },
          { id: 'item5', content: '0314', type: 'number' },
        ],
      },
      {
        id: 'chapter5-session4',
        chapterId: 'chapter5',
        sessionNumber: 4,
        storyText: `二十四日目。

別れの記憶。まどかは穏やかに、金木犀の匂いの中で目を閉じた。
「また、来てね」は別れの言葉ではなく、続きの言葉だった。

ミラが自室の外で泣いていた。「見ても、まどかは消えません。」`,
        choices: [
          { id: 'wont_forget', text: '忘れない' },
          { id: 'remembered_all', text: 'ちゃんと思い出せた' },
        ],
        trainingData: [
          { id: 'item1', content: '2024', type: 'number' },
          { id: 'item2', content: '365', type: 'number' },
          { id: 'item3', content: '24', type: 'number' },
          { id: 'item4', content: '12', type: 'number' },
          { id: 'item5', content: '1', type: 'number' },
        ],
      },
      {
        id: 'chapter5-session5',
        chapterId: 'chapter5',
        sessionNumber: 5,
        storyText: `二十五日目。

ミラのさよなら。
「あなたが全部思い出したから。私が案内するべき場所は、もうない。」

でも彼女は消えない。記憶の中に、まどかと一緒にいる。
記憶の宮殿が完成した。もう二度と、失わない。`,
        choices: [
          { id: 'meet_again', text: 'また会えますか' },
          { id: 'thank_you', text: 'ありがとう' },
        ],
        trainingData: [
          { id: 'item1', content: '317', type: 'number' },
          { id: 'item2', content: '111', type: 'number' },
          { id: 'item3', content: '222', type: 'number' },
          { id: 'item4', content: '333', type: 'number' },
          { id: 'item5', content: '444', type: 'number' },
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
