const gradientTop = "#16213E";
const gradientBottom = "#0F3460";
const textColor = "#ffffff";

const headingText = "Общий гороскоп на\n сегодня, ";
const formatDat = "d MMMM";

/*
 * * Change the value to whatever
 * * you need from 0 to 11.
 * * Where 0 corresponds to "Aries"
 * * and so on. You can also set this
 * * value to a widget setting, set Parameter inputt
 * */
let zodiac = 0;

const zodiacArr = [
  ["♈ Овен", "aries"], // 0
  ["♉ Телец", "taurus"], // 1..
  ["♊ Близнеци", "gemini"],
  ["♋ Рак", "cancer"],
  ["♌ Лев", "lion"],
  ["♍ Дева", "virgo"],
  ["♎ Весы", "libra"],
  ["♏ Скорпион", "scorpio"],
  ["♐ Стрелец", "sagittarius"],
  ["♑ Козерог", "capricorn"],
  ["♒ Водолей", "aquarius"],
  ["♓ Рыбы", "piscec"], // 11
];

const inputParameters = args.widgetParameter;
if (inputParameters) zodiac = inputParameters;

const url =
  "https://orakul.com/horoscope/astrologic/general/" +
  zodiacArr[zodiac][1] +
  "/today.html";

const widget = new ListWidget();

async function buildWidget() {
  const contentText = await orakulParse();

  const gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [new Color(gradientTop), new Color(gradientBottom)];
  widget.backgroundGradient = gradient;

  const headingStack = widget.addStack();
  const contentStack = widget.addStack();
  headingStack.setPadding(0, 0, 10, 10);

  const headingLeft = headingStack.addStack();
  const headingRight = headingStack.addStack();
  headingRight.setPadding(0, 0, 0, 0);
  headingRight.addSpacer(80);

  const heading = headingLeft.addText(zodiacArr[zodiac][0]);
  heading.font = Font.mediumSystemFont(18);
  heading.textOpacity = 0.9;
  heading.textColor = new Color(textColor);

  const dateSet = new DateFormatter();
  dateSet.dateFormat = formatDat;
  const date = dateSet.string(new Date());

  const headingDate = headingRight.addText(headingText + date);
  headingDate.font = Font.mediumSystemFont(10);
  headingDate.textOpacity = 0.8;
  headingDate.rightAlignText();
  headingDate.textColor = new Color(textColor);

  const content = contentStack.addText(contentText);
  content.font = Font.lightSystemFont(12);
  content.textOpacity = 0.7;
  content.textColor = new Color(textColor);
}

async function orakulParse() {
  const req = new Request(url);
  const request = await req.loadString();

  const start = request.indexOf("horoBlock");
  const end = request.indexOf("</p>", start + 1);

  return request.substring(start + 41, end);
}

await buildWidget();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();
