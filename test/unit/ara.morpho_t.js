var AraMorpho = require('../../ara/ara.morpho');
var expect = require('expect.js');

var morpho = new AraMorpho();

describe("Arabic Word normalization", function(){

  it("without options", function(){
    expect(morpho.normalize("ذهب")).to.eql("ذهب");
    expect(morpho.normalize("ذهــــــــب")).to.eql("ذهب");
    expect(morpho.normalize("ذَهَبٌ")).to.eql("ذهب");
    expect(morpho.normalize("ذَهــَبَ")).to.eql("ذهب");
    expect(morpho.normalize("دعى")).to.eql("دعي");
    expect(morpho.normalize("دعــــى")).to.eql("دعي");
    expect(morpho.normalize("دعاة")).to.eql("دعاه");
    expect(morpho.normalize("أَنَا")).to.eql("انا");
  });

  it("voc option", function(){
    expect(morpho.normalize("ذَهَبٌ", "voc")).to.eql("ذهب");
    expect(morpho.normalize("ذَهــَبَ", "voc")).not.to.eql("ذهب");
  });

  it("alef option", function(){
    expect(morpho.normalize("أنا", "alef")).to.eql("انا");
    expect(morpho.normalize("إنه", "alef")).to.eql("انه");
    expect(morpho.normalize("آسف", "alef")).to.eql("اسف");
  });

  it("yeh option", function(){
    expect(morpho.normalize("دعى", "yeh")).to.eql("دعي");
  });

  it("teh option", function(){
    expect(morpho.normalize("دعاة", "teh")).to.eql("دعاه");
  });

  it("_ option", function(){
    expect(morpho.normalize("ذهــــــــب", "_")).to.eql("ذهب");
  });

  it("options combination", function(){
    expect(morpho.normalize("ذَهــَبَ", "voc,_")).to.eql("ذهب");
    expect(morpho.normalize("ذَهــَبَ", "_,a lot of non sense,voc")).to.eql("ذهب");
    expect(morpho.normalize("دعــــى", "yeh, _")).to.eql("دعي");
    expect(morpho.normalize("دعــــــاة", "teh,_")).to.eql("دعاه");
    expect(morpho.normalize("أَنـــــَا", "alef,_,voc")).to.eql("انا");
  });

});


var
$ = Object.assign,//shorten the function
//tenses
pr = {tense:"present"},
pa = {tense:"past"},
//voice
pv = {voice: "passive"},
//pronouns
i = {person:"first", number: "singular"},
we = {person:"first", number: "plural"},

youm = {person:"second", number: "singular", gender: "masculine"},
youf = {person:"second", number: "singular", gender: "feminine"},
youmd = {person:"second", number: "dual", gender: "masculine"},
youfd = {person:"second", number: "dual", gender: "feminine"},
yoump = {person:"second", number: "plural", gender: "masculine"},
youfp = {person:"second", number: "plural", gender: "feminine"},

he = {person:"third", number: "singular", gender: "masculine"},
she = {person:"third", number: "singular", gender: "feminine"},
theymd = {person:"third", number: "dual", gender: "masculine"},
theyfd = {person:"third", number: "dual", gender: "feminine"},
theymp = {person:"third", number: "plural", gender: "masculine"},
theyfp = {person:"third", number: "plural", gender: "feminine"};

describe("Arabic Verb conjugation", function(){

  it("Sahih Salim (standard) past", function() {
    //past
    expect(morpho.conjugate("ذهب",$({}, pa, i))).to.eql("ذَهبْتُ");
    expect(morpho.conjugate("ذهب",$({}, pa, we))).to.eql("ذَهبْنَا");
    expect(morpho.conjugate("ذهب",$({}, pa, youm))).to.eql("ذَهبْتَ");
    expect(morpho.conjugate("ذهب",$({}, pa, youf))).to.eql("ذَهبْتِ");
    expect(morpho.conjugate("ذهب",$({}, pa, youmd))).to.eql("ذَهبْتُمَا");
    expect(morpho.conjugate("ذهب",$({}, pa, youfd))).to.eql("ذَهبْتُمَا");
    expect(morpho.conjugate("ذهب",$({}, pa, yoump))).to.eql("ذَهبْتُمْ");
    expect(morpho.conjugate("ذهب",$({}, pa, youfp))).to.eql("ذَهبْتُنَّ");
    expect(morpho.conjugate("ذهب",$({}, pa, he))).to.eql("ذَهبَ");
    expect(morpho.conjugate("ذهب",$({}, pa, she))).to.eql("ذَهبَتْ");
    expect(morpho.conjugate("ذهب",$({}, pa, theymd))).to.eql("ذَهبَا");
    expect(morpho.conjugate("ذهب",$({}, pa, theyfd))).to.eql("ذَهبَتَا");
    expect(morpho.conjugate("ذهب",$({}, pa, theymp))).to.eql("ذَهبُوا");
    expect(morpho.conjugate("ذهب",$({}, pa, theyfp))).to.eql("ذَهبْنَ");

  });

  it("Sahih Salim (standard) present", function() {
    //present
    expect(morpho.conjugate("ذهب",$({}, pr, i))).to.eql("أَذْهبُ");
    expect(morpho.conjugate("ذهب",$({}, pr, we))).to.eql("نَذْهبُ");
    expect(morpho.conjugate("ذهب",$({}, pr, youm))).to.eql("تَذْهبُ");
    expect(morpho.conjugate("ذهب",$({}, pr, youf))).to.eql("تَذْهبِينَ");
    expect(morpho.conjugate("ذهب",$({}, pr, youmd))).to.eql("تَذْهبَانِ");
    expect(morpho.conjugate("ذهب",$({}, pr, youfd))).to.eql("تَذْهبَانِ");
    expect(morpho.conjugate("ذهب",$({}, pr, yoump))).to.eql("تَذْهبُونَ");
    expect(morpho.conjugate("ذهب",$({}, pr, youfp))).to.eql("تَذْهبْنَ");
    expect(morpho.conjugate("ذهب",$({}, pr, he))).to.eql("يَذْهبُ");
    expect(morpho.conjugate("ذهب",$({}, pr, she))).to.eql("تَذْهبُ");
    expect(morpho.conjugate("ذهب",$({}, pr, theymd))).to.eql("يَذْهبَانِ");
    expect(morpho.conjugate("ذهب",$({}, pr, theyfd))).to.eql("تَذْهبَانِ");
    expect(morpho.conjugate("ذهب",$({}, pr, theymp))).to.eql("يَذْهبُونَ");
    expect(morpho.conjugate("ذهب",$({}, pr, theyfp))).to.eql("يَذْهبْنَ");

  });

  it("Muatal Mithal + alif", function() {
    //وضع Waw
    //past
    expect(morpho.conjugate("وضع",$({}, pa, i))).to.eql("وَضعْتُ");
    //present
    expect(morpho.conjugate("وضع",$({}, pr, youfd))).to.eql("تَضعَانِ");

    //استعمل alif
    //past
    expect(morpho.conjugate("استعمل",$({}, pa, i))).to.eql("استَعمَلْتُ");
    //present
    expect(morpho.conjugate("استعمل",$({}, pr, youfd))).to.eql("تَستعمِلَانِ");

    //ينع yaa
    //past
    expect(morpho.conjugate("ينع",$({}, pa, i))).to.eql("يَنعْتُ");
    //present
    expect(morpho.conjugate("ينع",$({}, pr, youfd))).to.eql("تَيْنعَانِ");

  });

  it("Muatal Naqis", function() {
    //دنا Waw
    //past
    expect(morpho.conjugate("دنا",$({}, pa, i))).to.eql("دَنوْتُ");
    expect(morpho.conjugate("دنا",$({}, pa, he))).to.eql("دَنا");
    expect(morpho.conjugate("دنا",$({}, pa, she))).to.eql("دَنَتْ");
    expect(morpho.conjugate("دنا",$({}, pa, theyfd))).to.eql("دَنَتَا");
    expect(morpho.conjugate("دنا",$({}, pa, theymp))).to.eql("دَنُوا");//VERIFY
    //present
    expect(morpho.conjugate("دنا",$({}, pr, i))).to.eql("أَدْنو");
    expect(morpho.conjugate("دنا",$({}, pr, youf))).to.eql("تَدْنِينَ");
    expect(morpho.conjugate("دنا",$({}, pr, yoump))).to.eql("تَدْنُونَ");
    expect(morpho.conjugate("دنا",$({}, pr, theymp))).to.eql("يَدْنُونَ");

    //مشى Yaa
    //past
    expect(morpho.conjugate("مشى",$({}, pa, i))).to.eql("مَشيْتُ");
    expect(morpho.conjugate("مشى",$({}, pa, he))).to.eql("مَشى");
    expect(morpho.conjugate("مشى",$({}, pa, she))).to.eql("مَشَتْ");
    expect(morpho.conjugate("مشى",$({}, pa, theyfd))).to.eql("مَشَتَا");
    expect(morpho.conjugate("مشى",$({}, pa, theymp))).to.eql("مَشُوا");//VERIFY
    //present
    expect(morpho.conjugate("مشى",$({}, pr, i))).to.eql("أَمْشي");
    expect(morpho.conjugate("مشى",$({}, pr, youf))).to.eql("تَمْشِينَ");
    expect(morpho.conjugate("مشى",$({}, pr, yoump))).to.eql("تَمْشُونَ");
    expect(morpho.conjugate("مشى",$({}, pr, theymp))).to.eql("يَمْشُونَ");

  });

  it("Muatal ajwaf", function() {
    //نام Alif
    //past
    expect(morpho.conjugate("نام",$({}, pa, i))).to.eql("نِمْتُ");
    expect(morpho.conjugate("نام",$({}, pa, theymd))).to.eql("نَامَا");
    expect(morpho.conjugate("نام",$({}, pa, theyfp))).to.eql("نِمْنَ");
    //present
    expect(morpho.conjugate("نام",$({}, pr, i))).to.eql("أَنَامُ");
    expect(morpho.conjugate("نام",$({}, pr, youfp))).to.eql("تَنَمْنَ");
    expect(morpho.conjugate("نام",$({}, pr, theyfp))).to.eql("يَنَمْنَ");

    //شاء Alif with Hamza
    //TODO fix it

    //عاد Waw
    //past
    expect(morpho.conjugate("عاد",$({}, pa, i))).to.eql("عُدْتُ");
    expect(morpho.conjugate("عاد",$({}, pa, theymd))).to.eql("عَادَا");
    expect(morpho.conjugate("عاد",$({}, pa, theyfp))).to.eql("عُدْنَ");
    //present
    expect(morpho.conjugate("عاد",$({}, pr, i))).to.eql("أَعُودُ");
    expect(morpho.conjugate("عاد",$({}, pr, youfp))).to.eql("تَعُدْنَ");

    //ساح Yaa
    //past
    expect(morpho.conjugate("ساح",$({}, pa, i))).to.eql("سِحْتُ");
    expect(morpho.conjugate("ساح",$({}, pa, theymd))).to.eql("سَاحَا");
    expect(morpho.conjugate("ساح",$({}, pa, theyfp))).to.eql("سِحْنَ");
    //present
    expect(morpho.conjugate("ساح",$({}, pr, i))).to.eql("أَسِيحُ");
    expect(morpho.conjugate("ساح",$({}, pr, youfp))).to.eql("تَسِحْنَ");

  });

  it("Salim muda33af", function() {
    //مدّ
    //past
    expect(morpho.conjugate("مدّ",$({}, pa, i))).to.eql("مَددْتُ");
    expect(morpho.conjugate("مدّ",$({}, pa, theymd))).to.eql("مَدَّا");
    expect(morpho.conjugate("مدّ",$({}, pa, theyfp))).to.eql("مَددْنَ");
    //present
    expect(morpho.conjugate("مدّ",$({}, pr, i))).to.eql("أَمُدُّ");
    expect(morpho.conjugate("مدّ",$({}, pr, youfp))).to.eql("تَمْددْنَ");
    expect(morpho.conjugate("مدّ",$({}, pr, theyfp))).to.eql("يَمْددْنَ");

  });

  it("verbs types", function() {
    //فعّل
    //past
    expect(morpho.conjugate("فعّل",$({}, pa, i))).to.eql("فَعَّلْتُ");
    expect(morpho.conjugate("فعّل",$({}, pa, theymd))).to.eql("فَعَّلَا");
    expect(morpho.conjugate("فعّل",$({}, pa, theyfp))).to.eql("فَعَّلْنَ");
    //present
    expect(morpho.conjugate("فعّل",$({}, pr, i))).to.eql("أُفَعِّلُ");
    expect(morpho.conjugate("فعّل",$({}, pr, youfp))).to.eql("تُفَعِّلْنَ");
    expect(morpho.conjugate("فعّل",$({}, pr, theyfp))).to.eql("يُفَعِّلْنَ");

    //فاعل
    //past
    expect(morpho.conjugate("فاعل",$({}, pa, i))).to.eql("فَاعَلْتُ");
    expect(morpho.conjugate("فاعل",$({}, pa, theymd))).to.eql("فَاعَلَا");
    expect(morpho.conjugate("فاعل",$({}, pa, theyfp))).to.eql("فَاعَلْنَ");
    //present
    expect(morpho.conjugate("فاعل",$({}, pr, i))).to.eql("أُفَاعِلُ");
    expect(morpho.conjugate("فاعل",$({}, pr, youfp))).to.eql("تُفَاعِلْنَ");
    expect(morpho.conjugate("فاعل",$({}, pr, theyfp))).to.eql("يُفَاعِلْنَ");

    //أفعل
    //past
    expect(morpho.conjugate("أفعل",$({}, pa, i))).to.eql("أفْعَلْتُ");
    expect(morpho.conjugate("أفعل",$({}, pa, theymd))).to.eql("أفْعَلَا");
    expect(morpho.conjugate("أفعل",$({}, pa, theyfp))).to.eql("أفْعَلْنَ");
    //present
    expect(morpho.conjugate("أفعل",$({}, pr, i))).to.eql("أُفْعِلُ");
    expect(morpho.conjugate("أفعل",$({}, pr, youfp))).to.eql("تُفْعِلْنَ");
    expect(morpho.conjugate("أفعل",$({}, pr, theyfp))).to.eql("يُفْعِلْنَ");

    //تفعّل
    //past
    expect(morpho.conjugate("تفعّل",$({}, pa, i))).to.eql("تفعَّلْتُ");
    expect(morpho.conjugate("تفعّل",$({}, pa, theymd))).to.eql("تفعَّلَا");
    expect(morpho.conjugate("تفعّل",$({}, pa, theyfp))).to.eql("تفعَّلْنَ");
    //present
    expect(morpho.conjugate("تفعّل",$({}, pr, i))).to.eql("أَتفعَّلُ");
    expect(morpho.conjugate("تفعّل",$({}, pr, youfp))).to.eql("تَتفعَّلْنَ");
    expect(morpho.conjugate("تفعّل",$({}, pr, theyfp))).to.eql("يَتفعَّلْنَ");

    //تفاعل
    //past
    expect(morpho.conjugate("تفاعل",$({}, pa, i))).to.eql("تفاعَلْتُ");
    expect(morpho.conjugate("تفاعل",$({}, pa, theymd))).to.eql("تفاعَلَا");
    expect(morpho.conjugate("تفاعل",$({}, pa, theyfp))).to.eql("تفاعَلْنَ");
    //present
    expect(morpho.conjugate("تفاعل",$({}, pr, i))).to.eql("أَتفاعَلُ");
    expect(morpho.conjugate("تفاعل",$({}, pr, youfp))).to.eql("تَتفاعَلْنَ");
    expect(morpho.conjugate("تفاعل",$({}, pr, theyfp))).to.eql("يَتفاعَلْنَ");

    //انفعل
    //past
    expect(morpho.conjugate("انفعل",$({}, pa, i))).to.eql("انفَعَلْتُ");
    expect(morpho.conjugate("انفعل",$({}, pa, theymd))).to.eql("انفَعَلَا");
    expect(morpho.conjugate("انفعل",$({}, pa, theyfp))).to.eql("انفَعَلْنَ");
    //present
    expect(morpho.conjugate("انفعل",$({}, pr, i))).to.eql("أَنفعِلُ");
    expect(morpho.conjugate("انفعل",$({}, pr, youfp))).to.eql("تَنفعِلْنَ");
    expect(morpho.conjugate("انفعل",$({}, pr, theyfp))).to.eql("يَنفعِلْنَ");

    //افتعل
    //past
    expect(morpho.conjugate("افتعل",$({}, pa, i))).to.eql("افتَعَلْتُ");
    expect(morpho.conjugate("افتعل",$({}, pa, theymd))).to.eql("افتَعَلَا");
    expect(morpho.conjugate("افتعل",$({}, pa, theyfp))).to.eql("افتَعَلْنَ");
    //present
    expect(morpho.conjugate("افتعل",$({}, pr, i))).to.eql("أَفتعِلُ");
    expect(morpho.conjugate("افتعل",$({}, pr, youfp))).to.eql("تَفتعِلْنَ");
    expect(morpho.conjugate("افتعل",$({}, pr, theyfp))).to.eql("يَفتعِلْنَ");

    //افعلّ
    //past
    expect(morpho.conjugate("افعلّ",$({}, pa, i))).to.eql("افعَلَلْتُ");
    expect(morpho.conjugate("افعلّ",$({}, pa, theymd))).to.eql("افعَلَّا");
    expect(morpho.conjugate("افعلّ",$({}, pa, theyfp))).to.eql("افعَلَلْنَ");
    //present
    expect(morpho.conjugate("افعلّ",$({}, pr, i))).to.eql("أَفْعَلُّ");
    expect(morpho.conjugate("افعلّ",$({}, pr, youfp))).to.eql("تَفعلِلْنَ");
    expect(morpho.conjugate("افعلّ",$({}, pr, theyfp))).to.eql("يَفعلِلْنَ");

    //استفعل
    //past
    expect(morpho.conjugate("استفعل",$({}, pa, i))).to.eql("استَفعَلْتُ");
    expect(morpho.conjugate("استفعل",$({}, pa, theymd))).to.eql("استَفعَلَا");
    expect(morpho.conjugate("استفعل",$({}, pa, theyfp))).to.eql("استَفعَلْنَ");
    //present
    expect(morpho.conjugate("استفعل",$({}, pr, i))).to.eql("أَستفعِلُ");
    expect(morpho.conjugate("استفعل",$({}, pr, youfp))).to.eql("تَستفعِلْنَ");
    expect(morpho.conjugate("استفعل",$({}, pr, theyfp))).to.eql("يَستفعِلْنَ");

  });

  it("Passive voice", function() {

    //Mu3tall Mithal
    //==============
    //وضع Waw
    //past
    expect(morpho.conjugate("وضع",$({}, pa, pv, i))).to.eql("وُضعْتُ");
    //present
    expect(morpho.conjugate("وضع",$({}, pr, pv, youfd))).to.eql("تُوضعَانِ");

    //ينع yaa
    //past
    expect(morpho.conjugate("ينع",$({}, pa, pv, i))).to.eql("يُنعْتُ");
    //present
    expect(morpho.conjugate("ينع",$({}, pr, pv, youfd))).to.eql("تُيْنعَانِ");


    // Muatal Naqis
    // ==============
    //دعا Waw
    //past
    expect(morpho.conjugate("دعا",$({}, pa, pv, i))).to.eql("دُنيْتُ");
    expect(morpho.conjugate("دعا",$({}, pa, pv, he))).to.eql("");
    expect(morpho.conjugate("دعا",$({}, pa, pv, she))).to.eql("");
    expect(morpho.conjugate("دعا",$({}, pa, pv, theyfd))).to.eql("");
    expect(morpho.conjugate("دعا",$({}, pa, pv, theymp))).to.eql("");
    //present
    expect(morpho.conjugate("دعا",$({}, pr, pv, i))).to.eql("أُدْعى");
    expect(morpho.conjugate("دعا",$({}, pr, pv, youf))).to.eql("");
    expect(morpho.conjugate("دعا",$({}, pr, pv, yoump))).to.eql("");
    expect(morpho.conjugate("دعا",$({}, pr, pv, theymp))).to.eql("");

    //مشى Yaa
    //past
    expect(morpho.conjugate("مشى",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("مشى",$({}, pa, pv, he))).to.eql("");
    expect(morpho.conjugate("مشى",$({}, pa, pv, she))).to.eql("");
    expect(morpho.conjugate("مشى",$({}, pa, pv, theyfd))).to.eql("");
    expect(morpho.conjugate("مشى",$({}, pa, pv, theymp))).to.eql("");
    //present
    expect(morpho.conjugate("مشى",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("مشى",$({}, pr, pv, youf))).to.eql("");
    expect(morpho.conjugate("مشى",$({}, pr, pv, yoump))).to.eql("");
    expect(morpho.conjugate("مشى",$({}, pr, pv, theymp))).to.eql("");


    //Muatal ajwaf"
    //نام Alif
    //past
    expect(morpho.conjugate("نام",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("نام",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("نام",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("نام",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("نام",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("نام",$({}, pr, pv, theyfp))).to.eql("");

    //شاء Alif with Hamza
    //TODO fix it

    //عاد Waw
    //past
    expect(morpho.conjugate("عاد",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("عاد",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("عاد",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("عاد",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("عاد",$({}, pr, pv, youfp))).to.eql("");

    //ساح Yaa
    //past
    expect(morpho.conjugate("ساح",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("ساح",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("ساح",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("ساح",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("ساح",$({}, pr, pv, youfp))).to.eql("");


    //Other verb types
    //=================
    //فعّل
    //past
    expect(morpho.conjugate("فعّل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("فعّل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("فعّل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("فعّل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("فعّل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("فعّل",$({}, pr, pv, theyfp))).to.eql("");

    //فاعل
    //past
    expect(morpho.conjugate("فاعل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("فاعل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("فاعل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("فاعل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("فاعل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("فاعل",$({}, pr, pv, theyfp))).to.eql("");

    //أفعل
    //past
    expect(morpho.conjugate("أفعل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("أفعل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("أفعل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("أفعل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("أفعل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("أفعل",$({}, pr, pv, theyfp))).to.eql("");

    //تفعّل
    //past
    expect(morpho.conjugate("تفعّل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("تفعّل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, pr, pv, theyfp))).to.eql("");

    //تفاعل
    //past
    expect(morpho.conjugate("تفاعل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("تفاعل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, pr, pv, theyfp))).to.eql("");

    //انفعل
    //past
    expect(morpho.conjugate("انفعل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("انفعل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, pr, pv, theyfp))).to.eql("");

    //افتعل
    //past
    expect(morpho.conjugate("افتعل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("افتعل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, pr, pv, theyfp))).to.eql("");

    //افعلّ
    //past
    expect(morpho.conjugate("افعلّ",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("افعلّ",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, pr, pv, theyfp))).to.eql("");

    //استفعل
    //past
    expect(morpho.conjugate("استفعل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("استفعل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, pr, pv, theyfp))).to.eql("");

  });

});
