/* ==========================================================================
   data.js — Global content data (lessons, stitches, fabrics)
   Project: Sewing Learning Site
   No fetch() — embedded as JS globals for file:// protocol compatibility
   ========================================================================== */

/* --------------------------------------------------------------------------
   LESSONS_DATA — 10 lessons, ordered
   -------------------------------------------------------------------------- */
window.LESSONS_DATA = [
  {
    id: "01-tools",
    order: 1,
    title: "Tools & Setup",
    subtitle: "Learn what you actually need — and what to skip for now.",
    file: "lessons/01-tools.html",
    quiz: "quiz/quiz-tools.html",
    hasQuiz: true,
    module: "Getting Started"
  },
  {
    id: "02-fabric",
    order: 2,
    title: "Fabric Fundamentals",
    subtitle: "Understand fabric before you buy or cut anything.",
    file: "lessons/02-fabric.html",
    quiz: null,
    hasQuiz: false,
    module: "Getting Started"
  },
  {
    id: "03-hand-stitches",
    order: 3,
    title: "Hand Stitches",
    subtitle: "The five stitches every sewer needs to know.",
    file: "lessons/03-hand-stitches.html",
    quiz: "quiz/quiz-stitches.html",
    hasQuiz: true,
    module: "First Skills"
  },
  {
    id: "04-machine-basics",
    order: 4,
    title: "Machine Basics",
    subtitle: "Threading, tension, and your first stitches on the machine.",
    file: "lessons/04-machine-basics.html",
    quiz: "quiz/quiz-machine.html",
    hasQuiz: true,
    module: "First Skills"
  },
  {
    id: "05-first-seam",
    order: 5,
    title: "Your First Seam",
    subtitle: "Seam allowance, seam guide, and sewing in a straight line.",
    file: "lessons/05-first-seam.html",
    quiz: null,
    hasQuiz: false,
    module: "Construction"
  },
  {
    id: "06-seam-finishing",
    order: 6,
    title: "Seam Finishing",
    subtitle: "Keep your seams from fraying apart.",
    file: "lessons/06-seam-finishing.html",
    quiz: null,
    hasQuiz: false,
    module: "Construction"
  },
  {
    id: "07-pressing",
    order: 7,
    title: "Pressing",
    subtitle: "The one step beginners skip that matters most.",
    file: "lessons/07-pressing.html",
    quiz: null,
    hasQuiz: false,
    module: "Construction"
  },
  {
    id: "08-reading-patterns",
    order: 8,
    title: "Reading Patterns",
    subtitle: "Decode the pattern envelope and layout diagram.",
    file: "lessons/08-reading-patterns.html",
    quiz: "quiz/quiz-fabrics.html",
    hasQuiz: true,
    module: "Patterns"
  },
  {
    id: "09-hems",
    order: 9,
    title: "Hems & Finishing",
    subtitle: "Machine hems, hand hems, and edge finishing.",
    file: "lessons/09-hems.html",
    quiz: null,
    hasQuiz: false,
    module: "Finishing"
  },
  {
    id: "10-project-pillow",
    order: 10,
    title: "Project: Pillow Cover",
    subtitle: "Your first complete project — applying everything you've learned.",
    file: "lessons/10-project-pillow.html",
    quiz: null,
    hasQuiz: false,
    module: "First Project"
  }
];

/* --------------------------------------------------------------------------
   STITCHES_DATA — 12 stitch reference entries
   -------------------------------------------------------------------------- */
window.STITCHES_DATA = [
  {
    id: "running-stitch",
    name: "Running Stitch",
    isoClass: "Hand",
    type: "hand",
    uses: ["Gathering", "Basting", "Simple seams", "Decorative quilting"],
    description: "The most basic stitch: the needle passes in and out of fabric at regular intervals in a straight line, creating a broken dashed line of stitches.",
    tips: ["Keep stitch length consistent — aim for equal stitches and gaps", "Use for temporary basting where the thread will be removed later"]
  },
  {
    id: "backstitch",
    name: "Backstitch",
    isoClass: "Hand",
    type: "hand",
    uses: ["Strong permanent seams", "Repairing seams", "Attaching buttons securely"],
    description: "The strongest hand stitch. After each forward stitch, the needle is inserted back into the end of the previous stitch, creating a continuous solid line on the top.",
    tips: ["The stitch looks like a continuous line from the front, with overlapping loops on the back", "Use this wherever you need a permanent, secure hand-sewn seam"]
  },
  {
    id: "whip-stitch",
    name: "Whip Stitch",
    isoClass: "Hand",
    type: "hand",
    uses: ["Joining two folded edges", "Closing stuffed items", "Appliqué"],
    description: "The needle passes diagonally over the edge of the fabric with each stitch, wrapping the thread around the edge. Creates a visible diagonal pattern along the join.",
    tips: ["Keep stitch spacing and depth consistent for a neat appearance", "Excellent for closing the opening on a pillow cover or stuffed toy"]
  },
  {
    id: "slip-stitch",
    name: "Slip Stitch (Ladder Stitch)",
    isoClass: "Hand",
    type: "hand",
    uses: ["Closing an opening invisibly", "Attaching folded edges", "Hemming"],
    description: "Thread alternates between two folded edges, catching only a few threads each time and pulling closed to create an invisible join. When pulled tight, the stitches 'ladder' disappear.",
    tips: ["Take tiny bites of each fold — only 2–3 fabric threads", "Pull the thread gently and evenly; tugging too hard puckers the join"]
  },
  {
    id: "basting-stitch",
    name: "Basting Stitch",
    isoClass: "Hand",
    type: "hand",
    uses: ["Temporarily holding fabric in place", "Gathering", "Marking"],
    description: "A long running stitch (1/2 to 1 inch intervals) used to temporarily join fabric layers or mark a line. Removed after permanent stitching is complete.",
    tips: ["Use a contrasting thread color so it's easy to find and remove", "Leave long thread tails so the basting can be pulled out easily"]
  },
  {
    id: "lockstitch",
    name: "Lockstitch (Machine Straight Stitch)",
    isoClass: "ISO 4915 Class 300",
    type: "machine",
    uses: ["All standard seams", "Topstitching", "Most general sewing"],
    description: "The standard machine stitch. Upper thread and bobbin thread interlock in the middle of the fabric layers, creating a solid line of stitches on both sides.",
    tips: ["Standard stitch length: 2.5mm for most fabrics", "Always backstitch 3–4 stitches at the start and end to lock the seam"]
  },
  {
    id: "zigzag-stitch",
    name: "Zigzag Stitch",
    isoClass: "ISO 4915 Class 300 variant",
    type: "machine",
    uses: ["Seam finishing (prevents fraying)", "Sewing knit fabrics", "Appliqué"],
    description: "The needle swings left and right as it advances, creating a zigzag pattern. Flexible and great for finishing raw edges or sewing stretchy fabric.",
    tips: ["For seam finishing, set width to 3–4mm, length to 2–2.5mm", "For knit fabrics, use a narrow zigzag to allow the seam to stretch"]
  },
  {
    id: "overlock-stitch",
    name: "Overlock / Serger Stitch",
    isoClass: "ISO 4915 Class 500",
    type: "machine",
    uses: ["Seam finishing", "Sewing knit seams", "Rolled hems"],
    description: "A serger stitch that simultaneously trims and wraps the raw edge in thread. Produced by a serger (overlocker) machine, not a standard sewing machine.",
    tips: ["Not all machines can do this — you need a serger/overlocker", "For home sewers without a serger, a zigzag stitch on a standard machine is a good substitute"]
  },
  {
    id: "blind-hem-stitch",
    name: "Blind Hem Stitch",
    isoClass: "ISO 4915 Class 300 variant",
    type: "machine",
    uses: ["Invisible hems on garments and curtains"],
    description: "A machine stitch pattern that alternates several straight stitches with one stitch that bites into the garment fabric. When done correctly the hem is nearly invisible from the right side.",
    tips: ["Requires a blind hem presser foot", "Test on a scrap first — adjust stitch width until the bite is just 1–2 threads of the main fabric"]
  },
  {
    id: "straight-stitch-baste",
    name: "Machine Basting Stitch",
    isoClass: "ISO 4915 Class 300",
    type: "machine",
    uses: ["Temporarily joining fabric", "Testing fit", "Creating gathering lines"],
    description: "A straight stitch set to the longest stitch length (4–5mm). Used like hand basting — temporary, easily removed. Also used in pairs to gather fabric.",
    tips: ["Do NOT backstitch at start or end — you need to pull the threads out easily", "Leave 4-inch thread tails so you can grab and pull the threads to gather"]
  },
  {
    id: "chainstitch",
    name: "Chain Stitch",
    isoClass: "ISO 4915 Class 100",
    type: "machine",
    uses: ["Industrial garment construction", "Decorative stitching"],
    description: "A single-thread stitch where each loop is pulled through the previous loop, forming a chain. Common in industrial sewing and some specialty machines.",
    tips: ["Not found on most home sewing machines", "Unravels quickly if the end thread is pulled — not recommended for seams that will be stressed"]
  },
  {
    id: "twin-needle",
    name: "Twin Needle Stitch",
    isoClass: "ISO 4915 Class 300 variant",
    type: "machine",
    uses: ["Decorative hems on knit garments", "Pin tucks", "Topstitching details"],
    description: "Uses a special twin needle that creates two parallel rows of stitching on the top and a zigzag on the underside, allowing the hem to stretch.",
    tips: ["Thread two separate thread spools — one through each needle", "Use on knit fabrics for hems that look professional and still stretch"]
  }
];

/* --------------------------------------------------------------------------
   FABRICS_DATA — 10 fabric reference entries
   -------------------------------------------------------------------------- */
window.FABRICS_DATA = [
  {
    id: "cotton",
    name: "Cotton",
    fiber: "Natural",
    weave: "Woven",
    stretch: "None",
    care: "Machine wash warm, tumble dry medium",
    beginner: true,
    needleType: "Universal 80/12",
    notes: "The best fabric for beginners. Doesn't slip while cutting, holds pins well, presses beautifully, and forgives mistakes. Quilting cotton is ideal to start."
  },
  {
    id: "cotton-poly-blend",
    name: "Cotton-Poly Blend",
    fiber: "Blend",
    weave: "Woven",
    stretch: "None to slight",
    care: "Machine wash warm, tumble dry",
    beginner: true,
    needleType: "Universal 80/12",
    notes: "Slightly wrinkle-resistant compared to pure cotton. Widely available. Behaves like cotton — excellent for beginners."
  },
  {
    id: "linen",
    name: "Linen",
    fiber: "Natural",
    weave: "Woven",
    stretch: "None",
    care: "Machine wash cold or hand wash; hang dry or tumble dry low",
    beginner: true,
    needleType: "Universal 80/12 or Sharp 80/12",
    notes: "Slightly stiff and prone to fraying, but easy to cut and sew. Press with steam for best results. Great for home decor and summer garments."
  },
  {
    id: "polyester",
    name: "Polyester",
    fiber: "Synthetic",
    weave: "Woven",
    stretch: "None to slight",
    care: "Machine wash warm, tumble dry low",
    beginner: false,
    needleType: "Universal 75/11",
    notes: "Slippery and can be difficult to cut and pin accurately. Doesn't press as well as natural fibers. Avoid for your very first projects."
  },
  {
    id: "jersey-knit",
    name: "Jersey Knit",
    fiber: "Synthetic or natural",
    weave: "Knit",
    stretch: "High (horizontal)",
    care: "Machine wash cold, tumble dry low",
    beginner: false,
    needleType: "Ballpoint/Stretch 75/11",
    notes: "T-shirt fabric. Curls at edges, shifts while sewing, and requires a stretch stitch or zigzag to prevent seams from popping. Not recommended until you're comfortable with woven fabrics."
  },
  {
    id: "denim",
    name: "Denim",
    fiber: "Cotton",
    weave: "Woven (twill)",
    stretch: "None",
    care: "Machine wash cold, tumble dry medium",
    beginner: false,
    needleType: "Jeans/Denim 90/14 or 100/16",
    notes: "Heavy and tough on needles. Requires a denim/jeans needle and a slower sewing pace. Good for bags once you have basic skills."
  },
  {
    id: "silk",
    name: "Silk",
    fiber: "Natural",
    weave: "Woven",
    stretch: "None to slight",
    care: "Hand wash cold or dry clean",
    beginner: false,
    needleType: "Sharp/Microtex 70/10",
    notes: "Slippery, frays easily, and requires delicate handling. Advanced fabric — avoid until you have solid sewing skills."
  },
  {
    id: "fleece",
    name: "Fleece",
    fiber: "Synthetic (polyester)",
    weave: "Knit (brushed)",
    stretch: "Moderate",
    care: "Machine wash cold, tumble dry low",
    beginner: true,
    needleType: "Ballpoint/Stretch 80/12",
    notes: "Does not fray, so raw edges need no finishing. Forgiving and easy to work with for scarves, blankets, and simple bags. One of the few beginner-friendly knits."
  },
  {
    id: "canvas",
    name: "Canvas",
    fiber: "Cotton",
    weave: "Woven (plain, heavy)",
    stretch: "None",
    care: "Machine wash warm",
    beginner: true,
    needleType: "Jeans/Denim 90/14",
    notes: "Heavy-duty woven fabric. Perfect for tote bags. Doesn't shift while sewing, is easy to cut, and holds shape well. Use a stronger needle."
  },
  {
    id: "muslin",
    name: "Muslin",
    fiber: "Cotton",
    weave: "Woven (plain, lightweight)",
    stretch: "None",
    care: "Machine wash warm",
    beginner: true,
    needleType: "Universal 80/12",
    notes: "Inexpensive plain-weave cotton. Ideal for making test garments ('muslins') before cutting into expensive fabric. Also great for practicing techniques."
  }
];
