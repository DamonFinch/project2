import User from 'assets/dashboard/user.svg'
import Wallet from 'assets/dashboard/wallet.svg'
import Bell from 'assets/dashboard/bell.svg'
import Settings from 'assets/dashboard/settings.svg'
import Bookmark from 'assets/dashboard/bookmark.svg'

export const languages = [
  ['Abkhazian', 'ab'],
  ['Afar', 'aa'],
  ['Afrikaans', 'af'],
  ['Akan', 'ak'],
  ['Albanian', 'sq'],
  ['Amharic', 'am'],
  ['Arabic', 'ar'],
  ['Aragonese', 'an'],
  ['Armenian', 'hy'],
  ['Assamese', 'as'],
  ['Avaric', 'av'],
  ['Avestan', 'ae'],
  ['Aymara', 'ay'],
  ['Azerbaijani', 'az'],
  ['Bambara', 'bm'],
  ['Bashkir', 'ba'],
  ['Basque', 'eu'],
  ['Belarusian', 'be'],
  ['Bengali (Bangla)', 'bn'],
  ['Bihari', 'bh'],
  ['Bislama', 'bi'],
  ['Bosnian', 'bs'],
  ['Breton', 'br'],
  ['Bulgarian', 'bg'],
  ['Burmese', 'my'],
  ['Catalan', 'ca'],
  ['Chamorro', 'ch'],
  ['Chechen', 'ce'],
  ['Chichewa, Chewa, Nyanja', 'ny'],
  ['Chinese', 'zh'],
  // ['Chinese (Simplified)', 'zh-Hans'],
  // ['Chinese (Traditional)', 'zh-Hant'],
  ['Chuvash', 'cv'],
  ['Cornish', 'kw'],
  ['Corsican', 'co'],
  ['Cree', 'cr'],
  ['Croatian', 'hr'],
  ['Czech', 'cs'],
  ['Danish', 'da'],
  ['Divehi, Dhivehi, Maldivian', 'dv'],
  ['Dutch', 'nl'],
  ['Dzongkha', 'dz'],
  ['English', 'en'],
  ['Esperanto', 'eo'],
  ['Estonian', 'et'],
  ['Ewe', 'ee'],
  ['Faroese', 'fo'],
  ['Fijian', 'fj'],
  ['Finnish', 'fi'],
  ['French', 'fr'],
  ['Fula, Fulah, Pulaar, Pular', 'ff'],
  ['Galician', 'gl'],
  ['Gaelic (Scottish)', 'gd'],
  ['Georgian', 'ka'],
  ['German', 'de'],
  ['Greek', 'el'],
  ['Greenlandic', 'kl'],
  ['Guarani', 'gn'],
  ['Gujarati', 'gu'],
  ['Haitian Creole', 'ht'],
  ['Hausa', 'ha'],
  ['Hebrew', 'he'],
  ['Herero', 'hz'],
  ['Hindi', 'hi'],
  ['Hiri Motu', 'ho'],
  ['Hungarian', 'hu'],
  ['Icelandic', 'is'],
  ['Ido', 'io'],
  ['Igbo', 'ig'],
  // ['Indonesian', 'id, in'],
  ['Interlingua', 'ia'],
  ['Interlingue', 'ie'],
  ['Inuktitut', 'iu'],
  ['Inupiak', 'ik'],
  ['Irish', 'ga'],
  ['Italian', 'it'],
  ['Japanese', 'ja'],
  ['Javanese', 'jv'],
  ['Kannada', 'kn'],
  ['Kanuri', 'kr'],
  ['Kashmiri', 'ks'],
  ['Kazakh', 'kk'],
  ['Khmer', 'km'],
  ['Kikuyu', 'ki'],
  ['Kinyarwanda (Rwanda)', 'rw'],
  ['Kirundi', 'rn'],
  ['Kyrgyz', 'ky'],
  ['Komi', 'kv'],
  ['Kongo', 'kg'],
  ['Korean', 'ko'],
  ['Kurdish', 'ku'],
  ['Kwanyama', 'kj'],
  ['Lao', 'lo'],
  ['Latin', 'la'],
  ['Latvian (Lettish)', 'lv'],
  ['Limburgish ( Limburger)', 'li'],
  ['Lingala', 'ln'],
  ['Lithuanian', 'lt'],
  ['Luga-Katanga', 'lu'],
  ['Luganda, Ganda', 'lg'],
  ['Luxembourgish', 'lb'],
  ['Manx', 'gv'],
  ['Macedonian', 'mk'],
  ['Malagasy', 'mg'],
  ['Malay', 'ms'],
  ['Malayalam', 'ml'],
  ['Maltese', 'mt'],
  ['Maori', 'mi'],
  ['Marathi', 'mr'],
  ['Marshallese', 'mh'],
  ['Moldavian', 'mo'],
  ['Mongolian', 'mn'],
  ['Nauru', 'na'],
  ['Navajo', 'nv'],
  ['Ndonga', 'ng'],
  ['Northern Ndebele', 'nd'],
  ['Nepali', 'ne'],
  ['Norwegian', 'no'],
  ['Norwegian bokmål', 'nb'],
  ['Norwegian nynorsk', 'nn'],
  ['Nuosu', 'ii'],
  ['Occitan', 'oc'],
  ['Ojibwe', 'oj'],
  ['Old Church Slavonic, Old Bulgarian', 'cu'],
  ['Oriya', 'or'],
  ['Oromo (Afaan Oromo)', 'om'],
  ['Ossetian', 'os'],
  ['Pāli', 'pi'],
  ['Pashto, Pushto', 'ps'],
  ['Persian (Farsi)', 'fa'],
  ['Polish', 'pl'],
  ['Portuguese', 'pt'],
  ['Punjabi (Eastern)', 'pa'],
  ['Quechua', 'qu'],
  ['Romansh', 'rm'],
  ['Romanian', 'ro'],
  ['Russian', 'ru'],
  ['Sami', 'se'],
  ['Samoan', 'sm'],
  ['Sango', 'sg'],
  ['Sanskrit', 'sa'],
  ['Serbian', 'sr'],
  ['Serbo-Croatian', 'sh'],
  ['Sesotho', 'st'],
  ['Setswana', 'tn'],
  ['Shona', 'sn'],
  ['Sindhi', 'sd'],
  ['Sinhalese', 'si'],
  ['Slovak', 'sk'],
  ['Slovenian', 'sl'],
  ['Somali', 'so'],
  ['Southern Ndebele', 'nr'],
  ['Spanish', 'es'],
  ['Sundanese', 'su'],
  ['Swahili (Kiswahili)', 'sw'],
  ['Swati', 'ss'],
  ['Swedish', 'sv'],
  ['Tagalog', 'tl'],
  ['Tahitian', 'ty'],
  ['Tajik', 'tg'],
  ['Tamil', 'ta'],
  ['Tatar', 'tt'],
  ['Telugu', 'te'],
  ['Thai', 'th'],
  ['Tibetan', 'bo'],
  ['Tigrinya', 'ti'],
  ['Tonga', 'to'],
  ['Tsonga', 'ts'],
  ['Turkish', 'tr'],
  ['Turkmen', 'tk'],
  ['Twi', 'tw'],
  ['Uyghur', 'ug'],
  ['Ukrainian', 'uk'],
  ['Urdu', 'ur'],
  ['Uzbek', 'uz'],
  ['Venda', 've'],
  ['Vietnamese', 'vi'],
  ['Volapük', 'vo'],
  ['Wallon', 'wa'],
  ['Welsh', 'cy'],
  ['Wolof', 'wo'],
  ['Western Frisian', 'fy'],
  ['Xhosa', 'xh'],
  ['Yiddish', 'yi, ji'],
  ['Yoruba', 'yo'],
  ['Zhuang, Chuang', 'za'],
  ['Zulu', 'zu']
]

export const TLDs = [
  'aaa',
  'abb',
  'abc',
  'ac',
  'aco',
  'ad',
  'ads',
  'ae',
  'aeg',
  'af',
  'afl',
  'ag',
  'ai',
  'aig',
  'al',
  'am',
  'anz',
  'ao',
  'aol',
  'app',
  'aq',
  'ar',
  'art',
  'as',
  'at',
  'au',
  'aw',
  'aws',
  'ax',
  'axa',
  'az',
  'ba',
  'bar',
  'bb',
  'bbc',
  'bbt',
  'bcg',
  'bcn',
  'bd',
  'be',
  'bet',
  'bf',
  'bg',
  'bh',
  'bi',
  'bid',
  'bio',
  'biz',
  'bj',
  'bm',
  'bms',
  'bmw',
  'bn',
  'bo',
  'bom',
  'boo',
  'bot',
  'box',
  'br',
  'bs',
  'bt',
  'buy',
  'bv',
  'bw',
  'by',
  'bz',
  'bzh',
  'ca',
  'cab',
  'cal',
  'cam',
  'car',
  'cat',
  'cba',
  'cbn',
  'cbs',
  'cc',
  'cd',
  'ceo',
  'cf',
  'cfa',
  'cfd',
  'cg',
  'ch',
  'ci',
  'ck',
  'cl',
  'cm',
  'cn',
  'co',
  'com',
  'cpa',
  'cr',
  'crs',
  'cu',
  'cv',
  'cw',
  'cx',
  'cy',
  'cz',
  'dad',
  'day',
  'dds',
  'de',
  'dev',
  'dhl',
  'diy',
  'dj',
  'dk',
  'dm',
  'dnp',
  'do',
  'dog',
  'dot',
  'dtv',
  'dvr',
  'dz',
  'eat',
  'ec',
  'eco',
  'edu',
  'ee',
  'eg',
  'er',
  'es',
  'esq',
  'et',
  'eu',
  'eus',
  'fan',
  'fi',
  'fit',
  'fj',
  'fk',
  'fly',
  'fm',
  'fo',
  'foo',
  'fox',
  'fr',
  'frl',
  'ftr',
  'fun',
  'fyi',
  'ga',
  'gal',
  'gap',
  'gay',
  'gb',
  'gd',
  'gdn',
  'ge',
  'gea',
  'gf',
  'gg',
  'gh',
  'gi',
  'gl',
  'gle',
  'gm',
  'gmo',
  'gmx',
  'gn',
  'goo',
  'gop',
  'got',
  'gov',
  'gp',
  'gq',
  'gr',
  'gs',
  'gt',
  'gu',
  'gw',
  'gy',
  'hbo',
  'hiv',
  'hk',
  'hkt',
  'hm',
  'hn',
  'hot',
  'how',
  'hr',
  'ht',
  'hu',
  'ibm',
  'ice',
  'icu',
  'id',
  'ie',
  'ifm',
  'il',
  'im',
  'in',
  'inc',
  'ing',
  'ink',
  'int',
  'io',
  'iq',
  'ir',
  'is',
  'ist',
  'it',
  'itv',
  'jcb',
  'je',
  'jio',
  'jll',
  'jm',
  'jmp',
  'jnj',
  'jo',
  'jot',
  'joy',
  'jp',
  'ke',
  'kfh',
  'kg',
  'kh',
  'ki',
  'kia',
  'kim',
  'km',
  'kn',
  'kp',
  'kpn',
  'kr',
  'krd',
  'kw',
  'ky',
  'kz',
  'la',
  'lat',
  'law',
  'lb',
  'lc',
  'lds',
  'li',
  'lk',
  'llc',
  'llp',
  'lol',
  'lpl',
  'lr',
  'ls',
  'lt',
  'ltd',
  'lu',
  'lv',
  'ly',
  'ma',
  'man',
  'map',
  'mba',
  'mc',
  'md',
  'me',
  'med',
  'men',
  'mg',
  'mh',
  'mil',
  'mit',
  'mk',
  'ml',
  'mlb',
  'mls',
  'mm',
  'mma',
  'mn',
  'mo',
  'moe',
  'moi',
  'mom',
  'mov',
  'mp',
  'mq',
  'mr',
  'ms',
  'msd',
  'mt',
  'mtn',
  'mtr',
  'mu',
  'mv',
  'mw',
  'mx',
  'my',
  'mz',
  'na',
  'nab',
  'nba',
  'nc',
  'ne',
  'nec',
  'net',
  'new',
  'news',
  'nf',
  'nfl',
  'ng',
  'ngo',
  'nhk',
  'ni',
  'nl',
  'no',
  'now',
  'np',
  'nr',
  'nra',
  'nrw',
  'ntt',
  'nu',
  'nyc',
  'nz',
  'obi',
  'om',
  'one',
  'ong',
  'onl',
  'ooo',
  'org',
  'ott',
  'ovh',
  'pa',
  'pay',
  'pe',
  'pet',
  'pf',
  'pg',
  'ph',
  'phd',
  'pid',
  'pin',
  'pk',
  'pl',
  'pm',
  'pn',
  'pnc',
  'pr',
  'pro',
  'pru',
  'ps',
  'pt',
  'pub',
  'pw',
  'pwc',
  'py',
  'qa',
  're',
  'red',
  'ren',
  'ril',
  'rio',
  'rip',
  'ro',
  'rs',
  'ru',
  'run',
  'rw',
  'rwe',
  'sa',
  'sap',
  'sas',
  'sb',
  'sbi',
  'sbs',
  'sc',
  'sca',
  'scb',
  'sd',
  'se',
  'sew',
  'sfr',
  'sg',
  'sh',
  'si',
  'sj',
  'sk',
  'ski',
  'sky',
  'sl',
  'sm',
  'sn',
  'so',
  'soy',
  'spa',
  'sr',
  'srl',
  'ss',
  'st',
  'stc',
  'su',
  'sv',
  'sx',
  'sy',
  'sz',
  'tab',
  'tax',
  'tc',
  'tci',
  'td',
  'tdk',
  'tel',
  'tf',
  'tg',
  'th',
  'thd',
  'tj',
  'tjx',
  'tk',
  'tl',
  'tm',
  'tn',
  'to',
  'top',
  'tr',
  'trv',
  'tt',
  'tui',
  'tv',
  'tvs',
  'tw',
  'tz',
  'ua',
  'ubs',
  'ug',
  'uk',
  'uno',
  'uol',
  'ups',
  'us',
  'uy',
  'uz',
  'va',
  'vc',
  've',
  'vet',
  'vg',
  'vi',
  'vig',
  'vin',
  'vip',
  'vn',
  'vu',
  'wed',
  'wf',
  'win',
  'wme',
  'wow',
  'ws',
  'wtc',
  'wtf',
  'xin',
  'xyz',
  'ye',
  'you',
  'yt',
  'yun',
  'za',
  'zip',
  'zm',
  'zw'
]

export const DASHBOARD_DROPDOWN_OPTIONS = [
  {
    name: 'Profile',
    icon: User,
    route: '/dashboard/profile'
  },
  {
    name: 'Wallet',
    icon: Wallet,
    route: '/dashboard/wallet'
  },
  {
    name: 'Notifications',
    icon: Bell,
    route: '/dashboard/notifications'
  },
  {
    name: 'Settings',
    icon: Settings,
    route: '/dashboard/settings'
  },
  {
    name: 'My Posts',
    icon: Bookmark,
    route: '/dashboard/posts/posted'
  }
]

export const POST_DROPDOWN_OPTIONS = [
  {
    name: 'Posted',
    route: '/dashboard/posts/posted'
  },
  {
    name: 'Voted',
    route: '/dashboard/posts/voted'
  },
  {
    name: 'Bookmarks',
    route: '/dashboard/posts/bookmarks'
  },
  {
    name: 'Drafts',
    route: '/dashboard/posts/drafts'
  }
]

export const SearchOrderBy: { [key: string]: number } = {
  reputation: 0,
  time: 1,
  similarity: 2
}

export const SearchSort: { [key: string]: number } = {
  earliest: 1, // oldest first, i.e. ascending
  latest: -1 // latest first, i.e. descending
}

export const CloudFunctionURL =
  'https://us-central1-phonic-jetty-356702.cloudfunctions.net'
