class BibleBook {
    testament: string;
    id: number;
    name: string;
    nameKo: string;
    chapterCount: number;

    constructor(testament: string, id: number, name: string, nameKo: string, chapterCount: number) {
        this.testament = testament;
        this.id = id;
        this.name = name;
        this.nameKo = nameKo;
        this.chapterCount = chapterCount;
    }
}
const NEW_TESTAMENT = 'new';
const OLD_TESTAMENT = 'old';

const genesis = new BibleBook(OLD_TESTAMENT, 1, 'genesis', '창세기', 50);
const exodus = new BibleBook(OLD_TESTAMENT, 2, 'exodus', '출애굽기', 40);
const leviticus = new BibleBook(OLD_TESTAMENT, 3, 'leviticus', '레위기', 27);
const numbers = new BibleBook(OLD_TESTAMENT, 4, 'numbers', '민수기', 36);
const deuteronomy = new BibleBook(OLD_TESTAMENT, 5, 'deuteronomy', '신명기', 34);
const joshua = new BibleBook(OLD_TESTAMENT, 6, 'joshua', '여호수아', 24);
const judges = new BibleBook(OLD_TESTAMENT, 7, 'judges', '사사기', 21);
const ruth = new BibleBook(OLD_TESTAMENT, 8, 'ruth', '룻기', 4);
const samuel1 = new BibleBook(OLD_TESTAMENT, 9, 'samuel1', '사무엘상', 31);
const samuel2 = new BibleBook(OLD_TESTAMENT, 10, 'samuel2', '사무엘하', 24);
const kings1 = new BibleBook(OLD_TESTAMENT, 11, 'kings1', '열왕기상', 22);
const kings2 = new BibleBook(OLD_TESTAMENT, 12, 'kings2', '열왕기하', 25);
const chronicles1 = new BibleBook(OLD_TESTAMENT, 13, 'chronicles1', '역대상', 29);
const chronicles2 = new BibleBook(OLD_TESTAMENT, 14, 'chronicles2', '역대하', 36);
const ezra = new BibleBook(OLD_TESTAMENT, 15, 'ezra', '에스라', 10);
const nehemiah = new BibleBook(OLD_TESTAMENT, 16, 'nehemiah', '느헤미야', 13);
const esther = new BibleBook(OLD_TESTAMENT, 17, 'esther', '에스더', 10);
const job = new BibleBook(OLD_TESTAMENT, 18, 'job', '욥기', 42);
const psalms = new BibleBook(OLD_TESTAMENT, 19, 'psalms', '시편', 150);
const proverbs = new BibleBook(OLD_TESTAMENT, 20, 'proverbs', '잠언', 31);
const ecclesiastes = new BibleBook(OLD_TESTAMENT, 21, 'ecclesiastes', '전도서', 12);
const songOfSongs = new BibleBook(OLD_TESTAMENT, 22, 'songOfSongs', '아가', 8);
const isaiah = new BibleBook(OLD_TESTAMENT, 23, 'isaiah', '이사야', 66);
const jeremiah = new BibleBook(OLD_TESTAMENT, 24, 'jeremiah', '예레미야', 52);
const lamentations = new BibleBook(OLD_TESTAMENT, 25, 'lamentations', '예레미야애가', 5);
const ezekiel = new BibleBook(OLD_TESTAMENT, 26, 'ezekiel', '에스겔', 48);
const daniel = new BibleBook(OLD_TESTAMENT, 27, 'daniel', '다니엘', 12);
const hosea = new BibleBook(OLD_TESTAMENT, 28, 'hosea', '호세아', 14);
const joel = new BibleBook(OLD_TESTAMENT, 29, 'joel', '요엘', 3);
const amos = new BibleBook(OLD_TESTAMENT, 30, 'amos', '아모스', 9);
const obadiah = new BibleBook(OLD_TESTAMENT, 31, 'obadiah', '오바디야', 1);
const jonah = new BibleBook(OLD_TESTAMENT, 32, 'jonah', '요나', 4);
const micah = new BibleBook(OLD_TESTAMENT, 33, 'micah', '미가', 7);
const nahum = new BibleBook(OLD_TESTAMENT, 34, 'nahum', '나훔', 3);
const habakkuk = new BibleBook(OLD_TESTAMENT, 35, 'habakkuk', '하박국', 3);
const zephaniah = new BibleBook(OLD_TESTAMENT, 36, 'zephaniah', '스바냐', 3);
const haggai = new BibleBook(OLD_TESTAMENT, 37, 'haggai', '학개', 2);
const zechariah = new BibleBook(OLD_TESTAMENT, 38, 'zechariah', '스가랴', 14);
const malachi = new BibleBook(OLD_TESTAMENT, 39, 'malachi', '말라기', 4);
const matthew = new BibleBook(NEW_TESTAMENT, 40, 'matthew', '마태복음', 28);
const mark = new BibleBook(NEW_TESTAMENT, 41, 'mark', '마가복음', 16);
const luke = new BibleBook(NEW_TESTAMENT, 42, 'luke', '누가복음', 24);
const john = new BibleBook(NEW_TESTAMENT, 43, 'john', '요한복음', 21);
const acts = new BibleBook(NEW_TESTAMENT, 44, 'acts', '사도행전', 28);
const romans = new BibleBook(NEW_TESTAMENT, 45, 'romans', '로마서', 16);
const corinthians1 = new BibleBook(NEW_TESTAMENT, 46, 'corinthians1', '고린도전서', 16);
const corinthians2 = new BibleBook(NEW_TESTAMENT, 47, 'corinthians2', '고린도후서', 13);
const galatians = new BibleBook(NEW_TESTAMENT, 48, 'galatians', '갈라디아서', 6);
const ephesians = new BibleBook(NEW_TESTAMENT, 49, 'ephesians', '에베소서', 6);
const philippians = new BibleBook(NEW_TESTAMENT, 50, 'philippians', '빌립보서', 4);
const colossians = new BibleBook(NEW_TESTAMENT, 51, 'colossians', '골로새서', 4);
const thessalonians1 = new BibleBook(NEW_TESTAMENT, 52, 'thessalonians1', '데살로니가전서', 5);
const thessalonians2 = new BibleBook(NEW_TESTAMENT, 53, 'thessalonians2', '데살로니가후서', 3);
const timothy1 = new BibleBook(NEW_TESTAMENT, 54, 'timothy1', '디모데전서', 6);
const timothy2 = new BibleBook(NEW_TESTAMENT, 55, 'timothy2', '디모데후서', 4);
const titus = new BibleBook(NEW_TESTAMENT, 56, 'titus', '디도서', 3);
const philemon = new BibleBook(NEW_TESTAMENT, 57, 'philemon', '빌레몬서', 1);
const hebrews = new BibleBook(NEW_TESTAMENT, 58, 'hebrews', '히브리서', 13);
const james = new BibleBook(NEW_TESTAMENT, 59, 'james', '야고보서', 5);
const peter1 = new BibleBook(NEW_TESTAMENT, 60, 'peter1', '베드로전서', 5);
const peter2 = new BibleBook(NEW_TESTAMENT, 61, 'peter2', '베드로후서', 3);
const john1 = new BibleBook(NEW_TESTAMENT, 62, 'john1', '요한1서', 5);
const john2 = new BibleBook(NEW_TESTAMENT, 63, 'john2', '요한2서', 1);
const john3 = new BibleBook(NEW_TESTAMENT, 64, 'john3', '요한3서', 1);
const jude = new BibleBook(NEW_TESTAMENT, 65, 'jude', '유다서', 1);
const revelation = new BibleBook(NEW_TESTAMENT, 66, 'revelation', '요한계시록', 22);

const oldTestamentBooks = [
  genesis,
  exodus,
  leviticus,
  numbers,
  deuteronomy,
  joshua,
  judges,
  ruth,
  samuel1,
  samuel2,
  kings1,
  kings2,
  chronicles1,
  chronicles2,
  ezra,
  nehemiah,
  esther,
  job,
  psalms,
  proverbs,
  ecclesiastes,
  songOfSongs,
  isaiah,
  jeremiah,
  lamentations,
  ezekiel,
  daniel,
  hosea,
  joel,
  amos,
  obadiah,
  jonah,
  micah,
  nahum,
  habakkuk,
  zephaniah,
  haggai,
  zechariah,
  malachi,
]
const newTestamentBooks = [
  matthew,
  mark,
  luke,
  john,
  acts,
  romans,
  corinthians1,
  corinthians2,
  galatians,
  ephesians,
  philippians,
  colossians,
  thessalonians1,
  thessalonians2,
  timothy1,
  timothy2,
  titus,
  philemon,
  hebrews,
  james,
  peter1,
  peter2,
  john1,
  john2,
  john3,
  jude,
  revelation,
]
const allBooks = [...oldTestamentBooks, ...newTestamentBooks];

export const getBookNameFromId = async (book: number): Promise<string> => {
    const bookObj = allBooks.find((bookObj) => bookObj.id == book);
    if (bookObj) {
        return bookObj.nameKo;
    }
    return '';      
}