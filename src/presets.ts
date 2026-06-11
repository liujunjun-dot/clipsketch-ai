import { PresetTutorial } from "./types";

export const PRESETS: PresetTutorial[] = [
  {
    id: "origami-crane",
    title: "Origami Crane Folding",
    chineseTitle: "折纸千羽鹤",
    style: "pencil",
    description: "从基本方形纸张，经过多层对折、反折、拉伸，折叠出一只展翅欲飞的经典千纸鹤。",
    steps: [
      {
        stepNumber: 1,
        title: "第一步：折出基础双三角",
        instruction: "将正方形纸的两角沿对角线精准折叠，压实折痕后打开。再沿中线横向、纵向各对折一次，顺褶皱内折构成双层三角复合基座。保持顶尖尖角微卷。",
        imagePrompt: "A pencil sketch of an origami square paper folded symmetrically into a double-triangle fold, dashed lines indicating alignment, minimal graphite texture.",
        illustrationUrl: "/api/fallback-placeholder?title=Origin_Fold_Triangle&style=pencil"
      },
      {
        stepNumber: 2,
        title: "第二步：折入侧翼对称尖角",
        instruction: "两手轻提上方层左右两端的侧翼边角，向中间折痕对齐并服气压平。顶部构成多角尖，使其形状有些类似风筝外轮廓。",
        imagePrompt: "A graphite pencil sketch showing origami paper wing folds, hands shaping the fold symmetrically, detailed shadow paper textures.",
        illustrationUrl: "/api/fallback-placeholder?title=Wing_Folding_Guide&style=pencil"
      },
      {
        stepNumber: 3,
        title: "第三步：向内反折天鹅颈与尾",
        instruction: "将左右斜向折入的修长底部纸翼，分别朝外、向上做逆向的反面翻折。左端稍稍下扣出斜头部的形状，右端顺直形成高耸的燕式尾羽。",
        imagePrompt: "Hand-drawn draft pencil drawing of finished paper folds, crane head and long neck stretching up, line guidelines, paper realism.",
        illustrationUrl: "/api/fallback-placeholder?title=Reverse_Neck_Fold&style=pencil"
      },
      {
        stepNumber: 4,
        title: "第四步：展开双翼展翅高飞",
        instruction: "两手捏住小千纸鹤最中心的三角凸脊，深吸一口气，平稳向两侧缓慢拉拨使主翼叶片撑平，直到两侧大翅膀在空中成一字舒展。",
        imagePrompt: "An elegant charcoal pencil drawing of a complete, beautifully shaped origami paper crane, subtle graphite blending, delicate wing shadows.",
        illustrationUrl: "/api/fallback-placeholder?title=Origami_Crane_Masterpiece&style=pencil"
      }
    ]
  },
  {
    id: "pears-sketch",
    title: "Pencil Pear Drawing Study",
    chineseTitle: "写意素描梨",
    style: "pencil",
    description: "经典的美术静物速写科目。教你如何用细腻的铅笔线条排线、分染，在平整画纸上绘出一颗立体的金黄圆梨。",
    steps: [
      {
        stepNumber: 1,
        title: "第一步：勾出大形、定宽高比",
        instruction: "削尖HB铅笔，用轻柔手臂动作在纸上勾画出一个上面稍窄、下端微胖的鸭梨几何雏形。画一条垂直微弧的轴线维持重心的平稳平衡。",
        imagePrompt: "A light HB pencil sketch of a round pear silhouette on canvas paper, faint skeleton lines, graphite trace.",
        illustrationUrl: "/api/fallback-placeholder?title=Pear_Skeleton_Layout&style=pencil"
      },
      {
        stepNumber: 2,
        title: "第二步：深雕梨把与底部果脐",
        instruction: "沿顶端十字中点加粗，反压一笔，绘出扭曲有致的梨柄，并深挖环状梨柄凹窝。在梨底点出一个微凹的扁平小果脐，加强立体转折。",
        imagePrompt: "Detailed pencil study of a pear stem base, heavy shading in the crevice, dark lead marks showing relief.",
        illustrationUrl: "/api/fallback-placeholder?title=Stem_Detail_Study&style=pencil"
      },
      {
        stepNumber: 3,
        title: "第三步：铺明暗调、定交界线",
        instruction: "使用较软的2B铅笔顺梨表面弧线作规律排线。涂暗明暗交界线背光面，并勾出投影晕。高光部分完全留白或用画夹皮擦轻轻提亮。",
        imagePrompt: "A pencil sketch of static pear, diagonal hatching lines, clear light and shadow separator, matte core study.",
        illustrationUrl: "/api/fallback-placeholder?title=Shading_And_Contrast&style=pencil"
      },
      {
        stepNumber: 4,
        title: "第四步：细腻擦拭、点饰斑点",
        instruction: "使用纸笔或化妆棉，顺受光弧面轻轻横向蹭擦，降低强烈生涩的线痕。用2H硬铅笔在表皮错落轻点一些微小黑点装饰梨子毛孔质感。",
        imagePrompt: "Artistic monochrome graphite study of a textured, ripe pear, soft smudged shadows, glowing light source, realistic textures.",
        illustrationUrl: "/api/fallback-placeholder?title=Finished_Pear_Study&style=pencil"
      }
    ]
  },
  {
    id: "lemon-watercolor",
    title: "Fresh Sliced Lemon",
    chineseTitle: "多汁黄柠檬",
    style: "watercolor",
    description: "一抹清新绚丽的水彩绘画！手把手演示如何用湿画法融入明黄与翠绿，留空晶莹剔透的水滴与放射状果膜。",
    steps: [
      {
        stepNumber: 1,
        title: "第一步：水性细勾、描摹轮廓",
        instruction: "手拿0号针笔或调淡的褐色水性毛笔，画出圆润带尖儿的柠檬主形以及两片略有舒卷的绿叶，力道轻盈，保留边缘自然的起伏。",
        imagePrompt: "A delicate ink pen outline sketch of a lemon, transparent aesthetic border on rich ivory color paper.",
        illustrationUrl: "/api/fallback-placeholder?title=Lemon_Outlines&style=watercolor"
      },
      {
        stepNumber: 2,
        title: "第二步：湿染明黄色与浅葱绿",
        instruction: "用大排笔蘸清水打湿果身，趁湿点染饱满高饱的金黄色与中黄色，在顶部和断叶梗接缝处接一笔浅翠绿，让冷暖色在纸上流润结合。",
        imagePrompt: "Watercolor wash of brilliant canary yellow and lime green blending on wet paper, organic paint runoffs.",
        illustrationUrl: "/api/fallback-placeholder?title=Wet_Color_Wash&style=watercolor"
      },
      {
        stepNumber: 3,
        title: "第三步：留白果瓤、点出隔膜",
        instruction: "画柠檬剖切片时，在内圈黄色果仁块中，用干燥的干头细描笔顺放射方向轻轻擦拭吸走多余水色，留出呈伞芒状的高亮白色膜隔。",
        imagePrompt: "Watercolor representation of sliced lemon lobes, white geometric citrus membranes, glistening droplets, highly professional art.",
        illustrationUrl: "/api/fallback-placeholder?title=Citrus_Lobes_Study&style=watercolor"
      },
      {
        stepNumber: 4,
        title: "第四步：边缘勾重、干结水渍",
        instruction: "待画面九成干，往两片绿叶边缘补充一道叶脉绿。柠檬外壳最暗区用一滴焦茶色或熟赭色微晕，风干后产生的深色水渍边尽显水彩风骨。",
        imagePrompt: "Finished watercolor painting of fresh lemon, glossy highlights, botanical handbook format, fine paper watercolor paint textures.",
        illustrationUrl: "/api/fallback-placeholder?title=Watercolor_Lemon_Slice&style=watercolor"
      }
    ]
  },
  {
    id: "latte-ink",
    title: "Classic Latte Art",
    chineseTitle: "情迷爱心拉花",
    style: "ink",
    description: "以传统中式水墨为媒介，将醇厚意式浓缩咖啡液和柔润奶沫融汇成一杯爱心，探索西式咖啡与东方写意之间的碰撞。",
    steps: [
      {
        stepNumber: 1,
        title: "第一步：匀速注奶、勾出基底",
        instruction: "以中墨蘸淡清水晕染出一个完美的圆盘形，作为杯口浓情热咖啡的油脂液面，中央偏下颜色渐浅，作蓄势待发的水流融合点。",
        imagePrompt: "An ink wash painting showing coffee cups flat view, dark circular espresso layers, soft textured circular ink strokes.",
        illustrationUrl: "/api/fallback-placeholder?title=Espresso_Ink_Base&style=ink"
      },
      {
        stepNumber: 2,
        title: "第二步：贴近液面点出乳白",
        instruction: "笔尖提浓白墨，轻轻触染淡色漩涡中心，缓慢左右小幅抖动。白墨在重色咖底中扩散，晕荡出层层递进的半月形环状羽状白泡。",
        imagePrompt: "Chinese traditional ink style showing white pigment blending in black canvas, symmetrical wave ripple textures.",
        illustrationUrl: "/api/fallback-placeholder?title=Milk_Foam_Agitation&style=ink"
      },
      {
        stepNumber: 3,
        title: "第三步：笔锋立切、向外提拉",
        instruction: "提笔、将毫毛立起成‘中锋’，吸饱少量重黑墨或淡赭，顺垂直方向自上而下凌空利落拉斩分切，把左右对称的两片白晕聚拢连结成一颗修长桃心。",
        imagePrompt: "Ink wash calligraphy stroke slicing through a circular abstract splash, dynamic hand motion lines.",
        illustrationUrl: "/api/fallback-placeholder?title=Heart_Cut_Stroke&style=ink"
      },
      {
        stepNumber: 4,
        title: "第四步：泼出缥缈咖啡气韵",
        instruction: "等杯中主形稍干，用饱水大毫沿杯沿泼扫几滴清淡游丝烟墨，绘成飘渺的热咖啡腾雾蒸汽，写意风流、香味四溢。",
        imagePrompt: "An elegant traditional Chinese ink wash masterpiece of latte art heart, zen balance, splash ink and calligraphic, Xuan paper backdrop.",
        illustrationUrl: "/api/fallback-placeholder?title=Finished_Latte_Ink&style=ink"
      }
    ]
  }
];
