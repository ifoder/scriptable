let url = "https://orakul.com/horoscope/astrologic/general/aries/today.html";
let req = new Request(url);
let html = await req.loadString();

const widget = new ListWidget();

async function CreateWidget() {
  let tex = extract(html);

  //  Add background gradient
  let gradient = new LinearGradient();
  gradient.locations = [0, 1];

  gradient.colors = [new Color("141414"), new Color("13233F")];

  widget.backgroundGradient = gradient;

  let headingS = widget.addStack();
  let contentS = widget.addStack();

  headingS.setPadding(0, 0, 10, 10);

  let headingLeft = headingS.addStack();
  let headingRight = headingS.addStack();

  headingRight.addSpacer(80);
  let heading = headingLeft.addText("♉️ Овен");

  heading.font = Font.mediumSystemFont(18);
  heading.textOpacity = 0.9;
  heading.textColor = new Color("#ffffff");

  let d = new DateFormatter();
  d.dateFormat = "dd MMMM";

  let date = d.string(new Date());
  log(date);

  let headingDate = headingRight.addText(date);
  headingDate.font = Font.mediumSystemFont(14);
  headingDate.setPadding(10, 0, 0, 0);
  headingDate.textOpacity = 0.9;
  headingDate.rightAlignText();
  headingDate.textColor = new Color("#ffffff");

  let content = contentS.addText(tex);
  content.font = Font.lightSystemFont(12);
  content.textOpacity = 0.7;
  content.textColor = new Color("#ffffff");
  log(tex);
}
await CreateWidget();
function extract(html) {
  let start = html.indexOf("horoBlock");
  let end = html.indexOf("</p>", start + 1);
  let prognoz = html.substring(start + 41, end);

  return prognoz;
}

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();
