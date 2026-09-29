// Every fact on the site lives here. Each record has a source URL and the month
// it was last checked against that source. Prices are standard US list prices
// (no intro deals, no student rates). If something here is out of date, open an
// issue with a link to the official page.

export const CHECKED = '2026-09';
export const CHECKED_LABEL = 'September 2026';
const checked = CHECKED;

export const CATEGORIES = [
  { id: 'books', name: 'Ebooks and audiobooks', short: 'Books' },
  { id: 'watch', name: 'Movies, TV and music', short: 'Watch + listen' },
  { id: 'news', name: 'News and magazines', short: 'News' },
  { id: 'learning', name: 'Classes, languages and tutoring', short: 'Learning' },
  { id: 'research', name: 'Research tools', short: 'Research' },
  { id: 'passes', name: 'Museum and park passes', short: 'Passes' },
  { id: 'things', name: 'Things you can borrow', short: 'Things' },
  { id: 'maker', name: 'Makerspaces', short: 'Maker' },
  { id: 'help', name: 'Free help', short: 'Help' },
];

// What each thing costs if you pay for it the normal way.
export const PRICES = {
  audible: {
    name: 'Audible Standard', price: 8.99, per: 'month', note: 'one audiobook a month',
    source: 'https://www.audible.com/ep/memberbenefits', checked,
  },
  kobo: {
    name: 'Kobo Plus Read', price: 7.99, per: 'month', note: 'ebooks only',
    source: 'https://www.kobo.com/us/en/plus', checked,
  },
  applenews: {
    name: 'Apple News+', price: 12.99, per: 'month', note: '',
    source: 'https://www.apple.com/apple-news/', checked,
  },
  pressreader: {
    name: 'PressReader', price: 29.99, per: 'month', note: '',
    source: 'https://www.pressreader.com/subscribe', checked,
  },
  wsj: {
    name: 'WSJ Digital', price: 44.99, per: '4 weeks', note: 'after the intro year',
    source: 'https://www.wsj.com/subscribe', checked,
  },
  consumer: {
    name: 'Consumer Reports Digital', price: 39, per: 'year', note: '',
    source: 'https://www.consumerreports.org/join/', checked,
  },
  criterion: {
    name: 'The Criterion Channel', price: 10.99, per: 'month', note: '',
    source: 'https://www.criterionchannel.com/subscribe', checked,
  },
  linkedin: {
    name: 'LinkedIn Premium Career', price: 39.99, per: 'month', note: 'comes with LinkedIn Learning',
    source: 'https://premium.linkedin.com/careers/career', checked,
  },
  babbel: {
    name: 'Babbel', price: 17.95, per: 'month', note: 'month-to-month plan',
    source: 'https://my.babbel.com/en/prices', checked,
  },
  rosetta: {
    name: 'Rosetta Stone', price: 19.99, per: 'month', note: 'monthly plan',
    source: 'https://www.rosettastone.com/buy/', checked,
  },
  tutor: {
    name: 'Princeton Review tutoring', price: 39.99, per: 'hour', note: 'the 1-hour-a-month plan',
    source: 'https://www.princetonreview.com/academic-tutoring/pricing?ceid=tcpr', checked,
  },
  creativebug: {
    name: 'Creativebug Unlimited', price: 7.95, per: 'month', note: '',
    source: 'https://www.creativebug.com/join', checked,
  },
  udemy: {
    name: 'Udemy Personal Plan', price: 13, per: 'month', note: 'starting price',
    source: 'https://www.udemy.com/personal-plan/', checked,
  },
  ancestry: {
    name: 'Ancestry U.S. Discovery', price: 24.99, per: 'month', note: '',
    source: 'https://www.ancestry.com/offers/subscribe', checked,
  },
  museum: {
    name: 'Art Institute of Chicago', price: 32, per: 'visit', note: 'one adult ticket',
    source: 'https://www.artic.edu/visit', checked,
  },
  parks: {
    name: 'Washington Discover Pass', price: 10, per: 'day', note: 'day pass',
    source: 'https://discoverpass.wa.gov/about-pass/what-discover-pass', checked,
  },
  hotspot: {
    name: 'T-Mobile hotspot plan', price: 25, per: 'month', note: '25GB, with AutoPay',
    source: 'https://www.t-mobile.com/cell-phone-plans/affordable-data-plans/hotspots', checked,
  },
  rental: {
    name: 'Rug Doctor rental', price: 39.99, per: 'day', note: 'carpet cleaner, 24 hours',
    source: 'https://www.rugdoctor.com/rent/', checked,
  },
  turbotax: {
    name: 'TurboTax Deluxe', price: 79, per: 'return', note: 'federal only',
    source: 'https://turbotax.intuit.com/personal-taxes/online/deluxe.jsp', checked,
  },
  notary: {
    name: 'a California notary', price: 15, per: 'signature', note: "the state's legal max",
    source: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=8211', checked,
  },
};

// The catalog. common: how often US public libraries have it (our read of the
// sources: survey numbers where they exist, vendor reach where they don't).
// where: home = works from your couch, branch = go in, both = depends.
export const ITEMS = [
  // Books
  {
    id: 'libby', category: 'books', name: 'Libby',
    what: "Your library's ebooks, audiobooks and magazines in one app. Borrow, place holds, read or listen on your phone. Magazines don't count toward your loan limit.",
    where: 'home', common: 'most', replaces: 'audible',
    check: { label: 'Find your library', url: 'https://www.overdrive.com/libraries' },
    source: 'https://help.libbyapp.com/en-us/6003.htm', checked,
  },
  {
    id: 'cloudlibrary', category: 'books', name: 'cloudLibrary',
    what: 'Ebooks and audiobooks in their own app. Some libraries add magazines, newspapers, comics and streaming video on top.',
    where: 'home', common: 'some', replaces: 'kobo',
    check: { label: 'Pick your state and library', url: 'https://www.yourcloudlibrary.com/en/home.html#find-your-library' },
    source: 'https://www.oclc.org/en/cloudlibrary.html', checked,
  },
  {
    id: 'palace', category: 'books', name: 'Palace',
    what: "A free app that pulls your library's ebooks and audiobooks into one shelf. Even if your library isn't on it yet, you still get more than 10,000 free books. iPhone and Android only.",
    where: 'home', common: 'some', replaces: 'kobo',
    check: null, checkHint: 'Pick your library inside the app',
    source: 'https://apps.apple.com/us/app/the-palace-project/id1574359693', checked,
  },
  {
    id: 'comics', category: 'books', name: 'Comics Plus',
    what: 'Digital comics you borrow with your card. Boston Public Library lists it right between Libby and Palace, and has a kids version too.',
    where: 'home', common: 'some', replaces: null,
    check: null,
    source: 'https://www.bpl.org/online-resources/', checked,
  },

  // Watch + listen
  {
    id: 'kanopy', category: 'watch', name: 'Kanopy',
    what: 'Ad-free streaming of 31,000+ films and shows from partners like A24, MGM, Warner Bros., PBS and The Great Courses. Your library gives you a set number of tickets a month.',
    where: 'home', common: 'many', replaces: 'criterion',
    check: { label: 'Find your library', url: 'https://www.kanopy.com/en/signup' },
    source: 'https://company.overdrive.com/2026/05/05/kanopy-spring-2026-public-library-town-hall-everything-you-need-to-know/',
    source2: 'https://help.kanopy.com/en-us/4260.htm', checked,
  },
  {
    id: 'hoopla', category: 'watch', name: 'Hoopla',
    what: 'Movies, TV, music, audiobooks, ebooks, comics and manga. Instant Borrows skip the waitlist, up to a monthly number your library picks. A BingePass opens a whole collection, like The Great Courses, for 7 days.',
    where: 'home', common: 'many', replaces: null, replacesText: 'Renting movies and buying albums one at a time',
    check: { label: 'Find your library', url: 'https://www.hoopladigital.com/register' },
    source: 'https://www.hoopladigital.com/faq', checked,
  },
  {
    id: 'freegal', category: 'watch', name: 'Freegal Music',
    what: 'Stream music and download songs from a catalog of over 20 million tracks. Your library sets a weekly download limit.',
    where: 'home', common: 'some', replaces: null, replacesText: 'Buying songs one at a time',
    check: null, checkHint: 'Search your ZIP code in the Freegal app',
    source: 'https://www.libraryideas.com/',
    source2: 'https://help.libraryideas.com/hc/en-us/articles/232278308-How-do-I-find-my-local-library-in-the-Freegal-App', checked,
  },

  // News
  {
    id: 'nyt', category: 'news', name: 'The New York Times',
    what: 'Full nytimes.com access. Some libraries hand out passes, like the 72-hour ones from Washington County Cooperative Library Services in Oregon. Others only unlock it inside the building.',
    where: 'both', common: 'many', replaces: null, replacesText: 'A New York Times subscription',
    check: null, checkHint: "Look on your library's databases page",
    source: 'https://www.wccls.org/digital-collections/new-york-times', checked,
  },
  {
    id: 'wsj', category: 'news', name: 'The Wall Street Journal',
    what: "Digital WSJ access at libraries that pay for it. Boston Public Library, for one, lists it with the Times and PressReader.",
    where: 'both', common: 'some', replaces: 'wsj',
    check: null, checkHint: "Look on your library's databases page",
    source: 'https://www.bpl.org/online-resources/', checked,
  },
  {
    id: 'magazines', category: 'news', name: 'Magazines in Libby',
    what: "Current issues of popular magazines, read in the Libby app. They don't count toward your loan limit.",
    where: 'home', common: 'many', replaces: 'applenews',
    check: { label: 'Find your library', url: 'https://www.overdrive.com/libraries' },
    source: 'https://help.libbyapp.com/en-us/6003.htm', checked,
  },
  {
    id: 'pressreader', category: 'news', name: 'PressReader',
    what: 'Thousands of newspapers and magazines from 120+ countries in 60+ languages, on your phone or in the library.',
    where: 'home', common: 'some', replaces: 'pressreader',
    check: null,
    source: 'https://about.pressreader.com/solutions/public-libraries/', checked,
  },
  {
    id: 'consumer-reports', category: 'news', name: 'Consumer Reports',
    what: 'The ratings, reviews and buying guides, ad-free. Look up the dishwasher before you buy the dishwasher.',
    where: 'both', common: 'many', replaces: 'consumer',
    check: null, checkHint: "Look on your library's databases page",
    source: 'https://about.ebsco.com/products/research-databases/consumerreportsorg', checked,
  },

  // Learning
  {
    id: 'linkedin-learning', category: 'learning', name: 'LinkedIn Learning',
    what: "16,000+ professional video courses in the library version. The usual way to get LinkedIn Learning is a LinkedIn Premium subscription.",
    where: 'home', common: 'many', replaces: 'linkedin',
    check: { label: 'Library sign-in page', url: 'https://www.linkedin.com/learning-login/go' },
    source: 'https://business.linkedin.com/learn/for-libraries', checked,
  },
  {
    id: 'mango', category: 'learning', name: 'Mango Languages',
    what: '70+ languages, plus English courses, in the app or on the web. Thousands of libraries, schools and colleges offer it.',
    where: 'home', common: 'many', replaces: 'babbel',
    check: { label: 'Find Mango near you', url: 'https://www.mangolanguages.com/find-mango' },
    source: 'https://www.mangolanguages.com/libraries', checked,
  },
  {
    id: 'transparent', category: 'learning', name: 'Transparent Language',
    what: 'Courses in 140+ languages, including ASL and Indigenous languages.',
    where: 'home', common: 'some', replaces: 'babbel',
    check: { label: 'Search by ZIP code', url: 'https://www.transparent.com/libraries/find-transparent-language-online' },
    source: 'https://www.transparent.com/libraries', checked,
  },
  {
    id: 'rosetta', category: 'learning', name: 'Rosetta Stone',
    what: 'The actual Rosetta Stone courses in 24 languages, with the mobile apps, through your library.',
    where: 'home', common: 'some', replaces: 'rosetta',
    check: null,
    source: 'https://about.ebsco.com/products/research-databases/rosetta-stone-library-solution', checked,
  },
  {
    id: 'brainfuse', category: 'learning', name: 'Brainfuse HelpNow',
    what: 'Live online tutors, plus a Writing Lab that sends your paper back reviewed within 24 hours. Its sibling JobNow helps with résumés and interviews.',
    where: 'home', common: 'some', replaces: 'tutor',
    check: null,
    source: 'https://home.brainfuse.com/libraries/helpnow/', checked,
  },
  {
    id: 'tutor-com', category: 'learning', name: 'Tutor.com',
    what: 'On-demand tutoring in 200+ subjects, kindergarten through college, from The Princeton Review.',
    where: 'home', common: 'some', replaces: 'tutor',
    check: null,
    source: 'https://www.tutor.com/libraries', checked,
  },
  {
    id: 'test-prep', category: 'learning', name: 'LearningExpress test prep',
    what: 'Practice tests and courses for the SAT, ACT, AP, GRE, GMAT, LSAT, MCAT, GED and the US citizenship test, plus a long list of job certification exams.',
    where: 'home', common: 'some', replaces: null, replacesText: 'Prep books and paid practice tests',
    check: null,
    source: 'https://about.ebsco.com/products/ebscolearning/learningexpress-library', checked,
  },
  {
    id: 'udemy', category: 'learning', name: 'Udemy (through Gale)',
    what: '25,000+ on-demand Udemy video courses in business, tech, design and more.',
    where: 'home', common: 'some', replaces: 'udemy',
    check: null,
    source: 'https://www.gale.com/product-catalog/elearning/gale-presents/gale-presents-udemy', checked,
  },
  {
    id: 'gale-courses', category: 'learning', name: 'Gale Courses',
    what: '325+ six-week online courses taught by real instructors. New sessions start every month.',
    where: 'home', common: 'some', replaces: null, replacesText: 'Paying per course',
    check: null,
    source: 'https://www.gale.com/product-catalog/elearning/stand-alone/gale-courses', checked,
  },
  {
    id: 'universal-class', category: 'learning', name: 'Universal Class',
    what: '600+ self-paced courses that earn CEUs, with instructors who look over your assignments.',
    where: 'home', common: 'some', replaces: null, replacesText: 'Paying per course',
    check: null,
    source: 'https://www.transparent.com/libraries/universalclass', checked,
  },
  {
    id: 'creativebug', category: 'learning', name: 'Creativebug',
    what: 'Thousands of art and craft video classes. Boston Public Library files it under Skills and Hobbies, next to Mango.',
    where: 'home', common: 'some', replaces: 'creativebug',
    check: null,
    source: 'https://www.bpl.org/online-resources/',
    source2: 'https://www.creativebug.com/join', checked,
  },

  // Research
  {
    id: 'ancestry', category: 'research', name: 'Ancestry Library Edition',
    what: "Billions of names across 6,000+ genealogy databases, free. The catch: you have to use it on library computers or library Wi-Fi. Remote access ended in December 2021.",
    where: 'branch', common: 'many', replaces: 'ancestry',
    check: null,
    source: 'https://library.austintexas.gov/digital/ancestry-library-edition', checked,
  },
  {
    id: 'investing', category: 'research', name: 'Morningstar and Value Line',
    what: "Morningstar's reports on 30,000 mutual funds, stocks and ETFs, plus Value Line's stock coverage. Boston Public Library has both.",
    where: 'both', common: 'some', replaces: null, replacesText: 'A Morningstar or Value Line subscription',
    check: null,
    source: 'https://www.bpl.org/online-resources/', checked,
  },
  {
    id: 'chilton', category: 'research', name: 'ChiltonLibrary',
    what: 'Repair and maintenance manuals for most cars, with diagnostics and technical service bulletins.',
    where: 'home', common: 'some', replaces: null, replacesText: 'Buying a repair manual for your car',
    check: null,
    source: 'https://www.gale.com/product-catalog/databases/stand-alone/chilton-library', checked,
  },
  {
    id: 'novelist', category: 'research', name: 'NoveList',
    what: 'Tell it a book you loved and it hands you read-alikes. There is a kids version too.',
    where: 'home', common: 'some', replaces: null,
    check: { label: 'Find your library', url: 'https://about.ebsco.com/novelist/find-my-organization' },
    source: 'https://about.ebsco.com/novelist', checked,
  },

  // Passes
  {
    id: 'museum-passes', category: 'passes', name: 'Museum passes',
    what: "Free or cheap tickets to museums, zoos and theaters, reserved with your card. NYC's Culture Pass covers 100+ places. Boston, Cambridge, Seattle, Denver and Michigan's statewide MAP program all do versions of it.",
    where: 'both', common: 'many', replaces: 'museum',
    check: null, checkHint: "Search your library's site for \"museum pass\"",
    source: 'https://www.culturepass.nyc/', checked,
  },
  {
    id: 'state-parks', category: 'passes', name: 'State park passes',
    what: 'Free day-use entry you check out like a book. Libraries lend them in California, Colorado, Delaware, Georgia, Massachusetts, Minnesota, Nevada, New Hampshire, Oregon, South Carolina, Vermont, Virginia, Washington and Wisconsin.',
    where: 'branch', common: 'some', replaces: 'parks',
    check: null, checkHint: 'Ask your library for a park pass',
    source: 'https://www.library.ca.gov/services/to-libraries/parks-pass/faq/',
    source2: 'https://discoverpass.wa.gov/about-pass/free-ways-visit/check-out-washington', checked,
  },

  // Things
  {
    id: 'hotspots', category: 'things', name: 'Wi-Fi hotspots',
    what: 'Take the internet home. 46.9% of US library systems lend hotspots, and at city libraries it is 69.4%.',
    where: 'branch', common: 'many', replaces: 'hotspot',
    check: null,
    source: 'https://www.ala.org/sites/default/files/2024-07/PLA_Tech_Survey_Report_2024.pdf', checked,
  },
  {
    id: 'laptops', category: 'things', name: 'Laptops and Chromebooks',
    what: 'Computers you can take home. About a quarter of library systems (24.8%) lend them.',
    where: 'branch', common: 'some', replaces: null,
    check: null,
    source: 'https://www.ala.org/sites/default/files/2024-07/PLA_Tech_Survey_Report_2024.pdf', checked,
  },
  {
    id: 'telescopes', category: 'things', name: 'Telescopes',
    what: 'Beginner telescopes you take home and point at the moon. The Library Telescope Program counts more than 1,200 participating locations.',
    where: 'branch', common: 'some', replaces: null,
    check: { label: 'Find a program', url: 'https://www.librarytelescope.org/' },
    source: 'https://www.librarytelescope.org/', checked,
  },
  {
    id: 'library-of-things', category: 'things', name: 'A library of things',
    what: "Sewing machines, KitchenAid mixers, lawn mowers, guitars, GoPros. Sacramento Public Library lends about 50 things like that, two weeks at a time.",
    where: 'branch', common: 'some', replaces: 'rental',
    check: null, checkHint: 'Search your library\'s catalog for "library of things"',
    source: 'https://www.saclibrary.org/browse-borrow/special-collections/library-things', checked,
  },
  {
    id: 'gadgets', category: 'things', name: 'Game consoles and gadgets',
    what: 'Gaming consoles, action cameras and coding robots. 22.3% of library systems lend tech like this.',
    where: 'branch', common: 'some', replaces: null,
    check: null,
    source: 'https://www.ala.org/sites/default/files/2024-07/PLA_Tech_Survey_Report_2024.pdf', checked,
  },
  {
    id: 'seeds', category: 'things', name: 'Seed libraries',
    what: 'Free seeds for your garden. Pima County Public Library in Tucson lets you check out 10 packets a month.',
    where: 'branch', common: 'some', replaces: null,
    check: null,
    source: 'https://www.library.pima.gov/seedlibrary/', checked,
  },

  // Maker
  {
    id: 'makerspace', category: 'maker', name: 'Makerspaces and 3D printers',
    what: '3D printers, engravers, sewing machines and more. 39.5% of library systems have maker equipment, and at city libraries it is 74.8%.',
    where: 'branch', common: 'many', replaces: null,
    check: null, checkHint: 'Search your library\'s site for "makerspace"',
    source: 'https://www.ala.org/sites/default/files/2024-07/PLA_Tech_Survey_Report_2024.pdf', checked,
  },

  // Help
  {
    id: 'tax-help', category: 'help', name: 'Free tax prep',
    what: 'IRS-certified volunteers do your return for free at tax time, and a lot of the sites are in libraries. VITA generally serves people making about $70,244 or less. AARP Tax-Aide focuses on people over 50.',
    where: 'branch', common: 'many', replaces: 'turbotax',
    check: { label: 'IRS site locator', url: 'https://freetaxassistance.for.irs.gov/s/sitelocator' },
    source: 'https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers',
    source2: 'https://www.aarp.org/money/taxes/aarp-taxaide/', checked,
  },
  {
    id: 'notary', category: 'help', name: 'Notary',
    what: 'Free notarizing, often by appointment. 39.2% of library systems offer notary help.',
    where: 'branch', common: 'many', replaces: 'notary',
    check: null, checkHint: 'Search your library\'s site for "notary"',
    source: 'https://www.ala.org/sites/default/files/2026-06/PLA_Services_Report_2026.pdf', checked,
  },
];

// The "wait, that's free?" cards at the top. Each points at a catalog item or a section.
export const HIGHLIGHTS = [
  {
    id: 'h-unbanned', href: '#bigger', kicker: 'Ages 13 to 26',
    title: 'A big-city card, from anywhere',
    text: "Boston and Seattle give a free ebook card to anyone 13 to 26 in the US. Brooklyn does it for 13 to 21. You don't need to live there.",
    stamp: 'Free',
    source: 'https://www.bpl.org/books-unbanned/', checked,
  },
  {
    id: 'h-kanopy', item: 'kanopy', kicker: 'Movies',
    title: 'A24 movies, no ads',
    text: 'Kanopy streams 31,000+ films and shows from partners like A24, MGM and PBS. You log in with your library card.',
    stamp: 'vs $10.99/mo',
    source: 'https://company.overdrive.com/2026/05/05/kanopy-spring-2026-public-library-town-hall-everything-you-need-to-know/', checked,
  },
  {
    id: 'h-linkedin', item: 'linkedin-learning', kicker: 'Learning',
    title: 'LinkedIn Learning, on the library',
    text: 'The library version has 16,000+ video courses. The usual way in is LinkedIn Premium, which runs $39.99 a month.',
    stamp: 'vs $39.99/mo',
    source: 'https://business.linkedin.com/learn/for-libraries', checked,
  },
  {
    id: 'h-parks', item: 'state-parks', kicker: 'Outside',
    title: 'Check out a state park',
    text: 'Libraries in 14 states lend free state park passes, from California and Colorado to Minnesota and Virginia.',
    stamp: 'Free entry',
    source: 'https://www.library.ca.gov/services/to-libraries/parks-pass/faq/', checked,
  },
  {
    id: 'h-telescope', item: 'telescopes', kicker: 'Things',
    title: 'Borrow a telescope',
    text: 'More than 1,200 places lend beginner telescopes through the Library Telescope Program. Take one home and go look at the moon.',
    stamp: '1,200+ spots',
    source: 'https://www.librarytelescope.org/', checked,
  },
  {
    id: 'h-taxes', item: 'tax-help', kicker: 'Money',
    title: 'Someone does your taxes',
    text: 'IRS-certified volunteers prepare returns for free, a lot of them at libraries. VITA generally serves people making about $70,244 or less.',
    stamp: 'vs $79',
    source: 'https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers', checked,
  },
];

// Calculator lines. value = qty × price × mult.
export const CALC = [
  {
    id: 'audiobooks', category: 'books', label: 'Audiobooks', shareName: 'audiobooks',
    via: 'Libby, Hoopla, cloudLibrary or Palace', items: ['libby', 'hoopla', 'cloudlibrary', 'palace'],
    price: 'audible', unit: { one: 'audiobook a month', many: 'audiobooks a month' },
    qty: { default: 1, min: 0, max: 8, step: 1 }, mult: 12, multLabel: 'months', status: 'later', checked,
  },
  {
    id: 'ebooks', category: 'books', label: 'Ebooks', shareName: 'ebooks',
    via: 'Libby, Hoopla, cloudLibrary or Palace', items: ['libby', 'hoopla', 'cloudlibrary', 'palace'],
    price: 'kobo', unit: { one: 'month of reading', many: 'months of reading' },
    qty: { default: 12, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'later', checked,
  },
  {
    id: 'magazines', category: 'books', label: 'Magazines', shareName: 'magazines',
    via: 'Libby or PressReader', items: ['magazines', 'pressreader'],
    price: 'applenews', unit: { one: 'month', many: 'months' },
    qty: { default: 6, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'later', checked,
  },
  {
    id: 'movies', category: 'watch', label: 'Movie streaming', shareName: 'ad-free movies',
    via: 'Kanopy or Hoopla', items: ['kanopy', 'hoopla'],
    price: 'criterion', unit: { one: 'month', many: 'months' },
    qty: { default: 12, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'later', checked,
  },
  {
    id: 'wsj', category: 'news', label: 'Wall Street Journal', shareName: 'the Wall Street Journal',
    via: 'your library\'s WSJ access', items: ['wsj'],
    price: 'wsj', unit: { one: '4-week stretch', many: '4-week stretches' },
    qty: { default: 0, suggest: 6, min: 0, max: 13, step: 1 }, mult: 1, multLabel: '', status: 'nope', checked,
  },
  {
    id: 'pressreader', category: 'news', label: 'PressReader', shareName: 'PressReader',
    via: 'PressReader', items: ['pressreader'],
    price: 'pressreader', unit: { one: 'month', many: 'months' },
    qty: { default: 0, suggest: 3, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'nope', checked,
  },
  {
    id: 'consumer', category: 'news', label: 'Consumer Reports', shareName: 'Consumer Reports',
    via: 'your library\'s databases', items: ['consumer-reports'],
    price: 'consumer', unit: { one: 'year of access', many: 'years of access' },
    qty: { default: 1, min: 0, max: 1, step: 1 }, mult: 1, multLabel: '', status: 'later', checked,
  },
  {
    id: 'courses', category: 'learning', label: 'Online courses', shareName: 'LinkedIn Learning',
    via: 'LinkedIn Learning', items: ['linkedin-learning'],
    price: 'linkedin', unit: { one: 'month', many: 'months' },
    qty: { default: 3, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'later', checked,
  },
  {
    id: 'languages', category: 'learning', label: 'Language lessons', shareName: 'language lessons',
    via: 'Mango, Transparent Language or Rosetta Stone', items: ['mango', 'transparent', 'rosetta'],
    price: 'babbel', unit: { one: 'month', many: 'months' },
    qty: { default: 6, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'later', checked,
  },
  {
    id: 'tutoring', category: 'learning', label: 'Tutoring', shareName: 'tutoring',
    via: 'Brainfuse or Tutor.com', items: ['brainfuse', 'tutor-com'],
    price: 'tutor', unit: { one: 'hour a year', many: 'hours a year' },
    qty: { default: 0, suggest: 2, min: 0, max: 40, step: 1 }, mult: 1, multLabel: '', status: 'nope', checked,
  },
  {
    id: 'crafts', category: 'learning', label: 'Craft classes', shareName: 'craft classes',
    via: 'Creativebug', items: ['creativebug'],
    price: 'creativebug', unit: { one: 'month', many: 'months' },
    qty: { default: 0, suggest: 3, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'nope', checked,
  },
  {
    id: 'genealogy', category: 'research', label: 'Family history', shareName: 'Ancestry',
    via: 'Ancestry Library Edition, in the building', items: ['ancestry'],
    price: 'ancestry', unit: { one: 'month', many: 'months' },
    qty: { default: 0, suggest: 1, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'nope', checked,
  },
  {
    id: 'museums', category: 'passes', label: 'Museum visits', shareName: 'museum passes',
    via: 'museum passes', items: ['museum-passes'],
    price: 'museum', unit: { one: 'visit a year', many: 'visits a year' },
    qty: { default: 2, min: 0, max: 24, step: 1 }, mult: 1, multLabel: '', status: 'later', checked,
  },
  {
    id: 'parks', category: 'passes', label: 'State park days', shareName: 'state park passes',
    via: 'state park passes', items: ['state-parks'],
    price: 'parks', unit: { one: 'day a year', many: 'days a year' },
    qty: { default: 0, suggest: 2, min: 0, max: 30, step: 1 }, mult: 1, multLabel: '', status: 'nope', checked,
  },
  {
    id: 'borrowing', category: 'things', label: 'Borrowed tools and gear', shareName: 'borrowed gear',
    via: 'a library of things', items: ['library-of-things'],
    price: 'rental', unit: { one: 'borrow a year', many: 'borrows a year' },
    qty: { default: 0, suggest: 2, min: 0, max: 20, step: 1 }, mult: 1, multLabel: '', status: 'nope', checked,
  },
  {
    id: 'hotspot', category: 'things', label: 'Wi-Fi hotspot', shareName: 'a Wi-Fi hotspot',
    via: 'hotspot lending', items: ['hotspots'],
    price: 'hotspot', unit: { one: 'month', many: 'months' },
    qty: { default: 0, suggest: 2, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'nope', checked,
  },
  {
    id: 'taxes', category: 'help', label: 'Tax prep', shareName: 'free tax prep',
    via: 'VITA or AARP Tax-Aide', items: ['tax-help'],
    price: 'turbotax', unit: { one: 'return', many: 'returns' },
    qty: { default: 1, min: 0, max: 2, step: 1 }, mult: 1, multLabel: '', status: 'later', checked,
  },
  {
    id: 'notary', category: 'help', label: 'Notarized signatures', shareName: 'a notary',
    via: 'library notary service', items: ['notary'],
    price: 'notary', unit: { one: 'signature a year', many: 'signatures a year' },
    qty: { default: 0, suggest: 1, min: 0, max: 10, step: 1 }, mult: 1, multLabel: '', status: 'nope', checked,
  },
];

// Quick settings. Anything not listed falls back to the line's default.
export const PRESETS = {
  typical: {},
  big: {
    audiobooks: { status: 'later', qty: 2 },
    magazines: { status: 'later', qty: 12 },
    wsj: { status: 'later', qty: 6 },
    courses: { status: 'later', qty: 6 },
    languages: { status: 'later', qty: 12 },
    tutoring: { status: 'later', qty: 4 },
    crafts: { status: 'later', qty: 3 },
    genealogy: { status: 'later', qty: 1 },
    museums: { status: 'later', qty: 6 },
    parks: { status: 'later', qty: 3 },
    borrowing: { status: 'later', qty: 2 },
    hotspot: { status: 'later', qty: 2 },
    notary: { status: 'later', qty: 2 },
  },
  books: {
    movies: { status: 'nope' },
    consumer: { status: 'nope' },
    courses: { status: 'nope' },
    languages: { status: 'nope' },
    museums: { status: 'nope' },
    taxes: { status: 'nope' },
  },
};

export const STATES = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado',
  CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
  KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts',
  MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
  NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico',
  NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

// Big systems that give cards to people outside their city.
// free: states whose residents get a free card.
// paid: a card for people outside the free area. where: 'anyone' or a list of states.
//   online: can you sign up without going in. digital: does it include ebooks and such.
// youth: a free card for young people anywhere in the US.
export const LIBRARIES = [
  {
    id: 'bpl', name: 'Brooklyn Public Library', city: 'Brooklyn', state: 'NY', free: ['NY'],
    who: 'Anyone who lives, works, pays property taxes or goes to school in New York State.',
    cardType: 'Apply online and start on the digital collection right away. Full access means a trip to a branch with ID.',
    paid: null,
    youth: { ages: '13 to 21', text: 'Books Unbanned: a free eCard for ages 13 to 21 anywhere in the US.', url: 'https://www.bklynlibrary.org/books-unbanned' },
    signupUrl: 'https://www.bklynlibrary.org/card',
    source: 'https://www.bklynlibrary.org/use-the-library/library-cards', checked,
  },
  {
    id: 'nypl', name: 'New York Public Library', city: 'New York', state: 'NY', free: ['NY'],
    who: 'Anyone 13 or older who lives, works, goes to school or pays property taxes in New York State.',
    cardType: "Apply online. If NYPL can't confirm you're in New York, you get a temporary card until you show ID at a branch.",
    paid: null, youth: null,
    signupUrl: 'https://www.nypl.org/library-card/new',
    source: 'https://libanswers.nypl.org/faq/364156', checked,
  },
  {
    id: 'qpl', name: 'Queens Public Library', city: 'Queens', state: 'NY', free: ['NY'],
    who: 'Free for anyone who lives, works, goes to school or owns property in New York State. Everyone else can buy the eCard.',
    cardType: 'eCard by email, no ID needed. It covers ebooks, other e-materials and the online databases.',
    paid: { fee: 50, where: 'anyone', online: true, digital: true, note: 'eCard for anyone outside New York' },
    youth: null,
    signupUrl: 'https://www.queenslibrary.org/get-a-card/eUser',
    source: 'https://www.queenslibrary.org/get-a-card/regular-card-ecard-info', checked,
  },
  {
    id: 'bostonpl', name: 'Boston Public Library', city: 'Boston', state: 'MA', free: ['MA'],
    who: 'Anyone who lives, works or owns property in Massachusetts, including students living there for school.',
    cardType: 'Online eCard for Libby, Palace and the other online stuff. Borrowing physical items needs a card from a branch.',
    paid: null,
    youth: { ages: '13 to 26', text: 'Books Unbanned: a free eCard for ages 13 to 26 anywhere in the US.', url: 'https://www.bpl.org/books-unbanned/' },
    signupUrl: 'https://www.bpl.org/ecard/',
    source: 'https://www.bpl.org/ecard/', checked,
  },
  {
    id: 'flp', name: 'Free Library of Philadelphia', city: 'Philadelphia', state: 'PA', free: ['PA'],
    who: 'Anyone who lives in Pennsylvania, plus anyone who lives, works, pays taxes or goes to school in Philadelphia.',
    cardType: 'Pennsylvania adults and teens can register online for instant access.',
    paid: null, youth: null,
    signupUrl: 'https://catalog.freelibrary.org/register',
    source: 'https://catalog.freelibrary.org/register', checked,
  },
  {
    id: 'pratt', name: 'Enoch Pratt Free Library', city: 'Baltimore', state: 'MD', free: ['MD'],
    who: 'Anyone who lives or owns property in Maryland.',
    cardType: 'Maryland residents can get an eCard online with instant digital access.',
    paid: { fee: 50, where: 'anyone', online: false, digital: false, note: 'out-of-state card, physical items only' },
    youth: null,
    signupUrl: 'https://www.prattlibrary.org/library-cards/ecard',
    source: 'https://www.prattlibrary.org/library-cards/out-of-state-visitors-pc-access-cards', checked,
  },
  {
    id: 'mcpl', name: 'Montgomery County Public Libraries', city: 'Rockville', state: 'MD', free: ['MD', 'DC'],
    who: 'Anyone living in Maryland or DC, plus people in Alexandria, Arlington, Fairfax, Loudoun and Prince William in Virginia.',
    cardType: 'Apply online or in person with photo ID and proof of address.',
    paid: { fee: 50, where: 'anyone', online: false, digital: true, note: 'first sign-up in person' },
    youth: null,
    signupUrl: 'https://www.montgomerycountymd.gov/montgomery-county-public-libraries/get-library-card',
    source: 'https://www.montgomerycountymd.gov/montgomery-county-public-libraries/get-library-card', checked,
  },
  {
    id: 'dcpl', name: 'DC Public Library', city: 'Washington', state: 'DC', free: ['DC'],
    who: 'Anyone who lives, works, pays property taxes or goes to school in DC, plus residents of nearby Maryland and Virginia areas.',
    cardType: 'DC-area residents can start online. Everyone else applies in person.',
    paid: { fee: 20, where: 'anyone', online: false, digital: true, note: 'good for one year, in person' },
    youth: null,
    signupUrl: 'https://www.dclibrary.org/get-a-card',
    source: 'https://www.dclibrary.org/get-a-card', checked,
  },
  {
    id: 'fcpl', name: 'Fairfax County Public Library', city: 'Fairfax', state: 'VA', free: [],
    who: 'Free for people who live, work, go to school or own property in Fairfax County and nearby partner areas. Anyone else in the US can buy a card.',
    cardType: 'Apply online. Non-resident applications take up to 7 business days, then you pay.',
    paid: { fee: 50, where: 'anyone', online: true, digital: true, note: 'or $75 for 2 years, $100 for 3. Includes ebooks' },
    youth: null,
    signupUrl: 'https://www.fairfaxcounty.gov/library/non-resident-library-card-application',
    source: 'https://www.fairfaxcounty.gov/library/non-resident-library-card-application', checked,
  },
  {
    id: 'cmlib', name: 'Charlotte Mecklenburg Library', city: 'Charlotte', state: 'NC', free: [],
    who: 'Free for Mecklenburg County residents, property owners and students at county schools. Anyone else can pay a yearly fee.',
    cardType: 'Non-residents apply with the online form and get instant access to the online resources while staff process it.',
    paid: { fee: 45, where: 'anyone', online: true, digital: true, note: 'per household, $35 if you are 62 or older' },
    youth: null,
    signupUrl: 'https://www.cmlibrary.org/get-a-card',
    source: 'https://www.cmlibrary.org/get-a-card', checked,
  },
  {
    id: 'bcl', name: 'Broward County Library', city: 'Fort Lauderdale', state: 'FL', free: [],
    who: 'The instant eCard is free for anyone who lives, works, goes to school or is visiting Broward County. Anyone else can buy the Non-Resident eCard.',
    cardType: 'Non-Resident eCard: fill out a short online form and staff get back to you within 14 business days.',
    paid: { fee: 38, where: 'anyone', online: true, digital: true, note: 'Non-Resident eCard, full digital collection' },
    youth: null,
    signupUrl: 'https://www.broward.org/library/getalibrarycard',
    source: 'https://www.broward.org/library/getalibrarycard', checked,
  },
  {
    id: 'lapl', name: 'Los Angeles Public Library', city: 'Los Angeles', state: 'CA', free: ['CA'],
    who: 'Anyone who lives in California. The instant online e-card is only for City of LA residents.',
    cardType: 'Pre-register online, then pick up in person with photo ID and proof of address.',
    paid: { fee: 50, where: 'anyone', online: false, digital: true, note: 'outside California, in person only' },
    youth: { ages: '13 and up', text: 'Read Freely: anyone 13 or older in the US can get a free card for a selection of the most challenged books.', url: 'https://www.lapl.org/read-freely' },
    signupUrl: 'https://www.lapl.org/library-card/library-card-pre-registration',
    source: 'https://www.lapl.org/library-card/borrowing-policies-and-information', checked,
  },
  {
    id: 'sfpl', name: 'San Francisco Public Library', city: 'San Francisco', state: 'CA', free: ['CA'],
    who: 'Anyone who lives in California.',
    cardType: 'Start online, then show photo ID at any branch. No online-only cards.',
    paid: null, youth: null,
    signupUrl: 'https://sfpl.org/welcome-new-cardholders/application',
    source: 'https://sfpl.libanswers.com/faq/65116', checked,
  },
  {
    id: 'sdpl', name: 'San Diego Public Library', city: 'San Diego', state: 'CA', free: ['CA'],
    who: 'Anyone who lives in California or owns property in the City of San Diego.',
    cardType: 'Register online for a temporary number, then pick up the card at a branch with photo ID and proof of address.',
    paid: { fee: 32.5, where: 'anyone', online: false, digital: true, note: 'non-resident card, apply in person' },
    youth: null,
    signupUrl: 'https://www.sandiego.gov/public-library/services/lending/librarycard',
    source: 'https://www.sandiego.gov/public-library/services/lending', checked,
  },
  {
    id: 'hpl', name: 'Houston Public Library', city: 'Houston', state: 'TX', free: ['TX'],
    who: 'Any Texas resident can get the free MYLink digital card.',
    cardType: 'MYLink: apply online for ebooks, audiobooks, digital magazines and music. Physical items need a full card from a branch.',
    paid: null, youth: null,
    signupUrl: 'https://houstonlibrary.org/mylink',
    source: 'https://houstonlibrary.org/mylink', checked,
  },
  {
    id: 'dpl', name: 'Denver Public Library', city: 'Denver', state: 'CO', free: ['CO'],
    who: 'Any Colorado resident, or any student at a Colorado college or university.',
    cardType: 'eCard online. If you live outside Denver County, you have to register in person to use Libby.',
    paid: null, youth: null,
    signupUrl: 'https://www.denverlibrary.org/get-library-card',
    source: 'https://www.denverlibrary.org/library-card', checked,
  },
  {
    id: 'ccpl', name: 'Cuyahoga County Public Library', city: 'Parma', state: 'OH', free: ['OH'],
    who: 'Every Ohio resident, any age.',
    cardType: 'Apply online for instant access.',
    paid: null, youth: null,
    signupUrl: 'https://cuyahogalibrary.org/adult-card-application',
    source: 'https://cuyahogalibrary.org/get-a-ccpl-card', checked,
  },
  {
    id: 'cml', name: 'Columbus Metropolitan Library', city: 'Columbus', state: 'OH', free: ['OH'],
    who: 'Anyone who lives in Ohio.',
    cardType: 'Apply online for a digital card number you can use right away.',
    paid: null, youth: null,
    signupUrl: 'https://www.columbuslibrary.org/apply-library-card/',
    source: 'https://www.columbuslibrary.org/apply-library-card/', checked,
  },
  {
    id: 'chpl', name: 'Cincinnati & Hamilton County Public Library', city: 'Cincinnati', state: 'OH', free: ['OH'],
    who: 'Anyone who lives in Ohio or owns property in Hamilton County.',
    cardType: 'Apply online for a temporary number, then activate the card in person.',
    paid: { fee: 90, where: 'anyone', online: false, digital: false, note: 'out-of-state card; ask what it covers' },
    youth: null,
    signupUrl: 'https://apps.chpl.org/Get-A-Card',
    source: 'https://chpl.org/faq/library-cards/', checked,
  },
  {
    id: 'hclib', name: 'Hennepin County Library', city: 'Minneapolis', state: 'MN', free: ['MN'],
    freeNote: 'for most Minnesotans',
    who: 'Hennepin County residents get a card. Most other Minnesota residents can register their local library card with Hennepin.',
    cardType: 'County residents apply online. Other Minnesotans register at a branch.',
    paid: { fee: 60, where: 'anyone', online: false, digital: false, note: 'outside Minnesota, physical items only' },
    youth: null,
    signupUrl: 'https://www.hclib.org/about/library-cards/library-card-application',
    source: 'https://www.hclib.org/about/library-cards', checked,
  },
  {
    id: 'pima', name: 'Pima County Public Library', city: 'Tucson', state: 'AZ', free: ['AZ'],
    who: 'Anyone who lives in Arizona.',
    cardType: 'Email a photo ID and proof of address and they send back a card number. Pima County residents can also get an instant eCard.',
    paid: null, youth: null,
    signupUrl: 'https://www.library.pima.gov/getalibrarycard/',
    source: 'https://www.library.pima.gov/getalibrarycard/', checked,
  },
  {
    id: 'spl', name: 'Seattle Public Library', city: 'Seattle', state: 'WA', free: [],
    who: 'Free for people who live, work, go to school or own property in Seattle or most of King County. Other Washington residents can pay.',
    cardType: 'Apply online. Ebooks work as soon as your address is verified.',
    paid: { fee: 85, where: ['WA'], online: true, digital: true, note: 'for Washington residents outside the Seattle area' },
    youth: { ages: '13 to 26', text: 'Books Unbanned: a free card for the whole ebook and audiobook collection, ages 13 to 26 anywhere in the US.', url: 'https://www.spl.org/programs-and-services/teens/books-unbanned' },
    signupUrl: 'https://www.spl.org/using-the-library/get-started/get-started-in-english/get-started-with-a-library-card',
    source: 'https://www.spl.org/using-the-library/get-started/get-started-in-english/get-started-with-a-library-card', checked,
  },
];

export const HOWTO = [
  {
    title: 'Find your library',
    text: 'Search your city or county name plus "library card". Most library sites have a Get a Card page right on the front.',
    source: 'https://www.ala.org/conferencesevents/celebrationweeks/card', checked,
  },
  {
    title: 'Bring two things',
    text: 'Libraries usually want to see who you are and where you live.',
    list: [
      'A photo ID. At Cambridge Public Library a school ID counts.',
      'Proof of address, like a lease, a utility bill or mail with your name on it. Boston and Cambridge take it on your phone.',
    ],
    source: 'https://www.cambridgema.gov/iwantto/getalibrarycard', checked,
  },
  {
    title: 'Start online',
    text: 'Plenty of big libraries let you apply online and hand you a number for the digital stuff right away. Philadelphia, Houston and Cuyahoga County all do. You finish up at a branch later if you want physical books.',
    source: 'https://houstonlibrary.org/mylink', checked,
  },
  {
    title: 'Get the apps',
    text: 'Libby for ebooks and audiobooks, Kanopy and Hoopla for movies. Each one asks for your card number and PIN, then you are in.',
    source: 'https://www.overdrive.com/libraries', checked,
  },
];

export const STUDENT_TIP = {
  lead: 'In college somewhere else?',
  text: "Lots of libraries count going to school there the same as living there. A student in Boston can get a Boston Public Library card, a student in New York can get NYPL, Brooklyn and Queens cards, and Denver takes students at any Colorado college. Check the rules for",
  examples: [
    { name: 'Boston', url: 'https://www.bpl.org/get-a-library-card/' },
    { name: 'Cambridge', url: 'https://www.cambridgema.gov/iwantto/getalibrarycard' },
    { name: 'NYPL', url: 'https://www.nypl.org/help/library-card' },
    { name: 'Seattle', url: 'https://www.spl.org/using-the-library/get-started/get-a-library-card' },
    { name: 'Denver', url: 'https://www.denverlibrary.org/library-card' },
  ],
  checked,
};
