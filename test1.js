const widget = new ListWidget();

async function CreateWidget() {
  widget.backgroundColor = new Color("#000000");

  let heading = widget.addText("🚀Next🚀");
  heading.centerAlignText();
  heading.font = Font.lightSystemFont(25);
  heading.textColor = new Color("#ffffff");

  widget.addSpacer(15);

  let launch = await getNextLaunch();
  let launchDateTime = getLaunchDateTime(launch);

  displayLaunchDateTime(widget, launchDateTime, launch.date_precision);
}

async function getNextLaunch() {
  const url = "https://api.spacexdata.com/v4/launches/next";
  const request = new Request(url);
  const response = await request.loadJSON();

  return response;
}

function getLaunchDateTime(launchData) {
  const launchDataTime = new Date(launchData.date_utc);
  return launchDataTime;
}

function addDateText(stack, text) {
  let dateText = stack.addText(text);
  dateText.centerAlignText();
  dateText.font = Font.semiboldSystemFont(20);
  dateText.textColor = new Color("#ffffff");
}

function displayLaunchDateTime(stack, launchDateTime, precision) {
  if (precision == "hour") {
    const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    let datestring = launchDateTime.toLocaleDateString(undefined, dateOptions);
    addDateText(stack, datestring);

    const timeOptions = { hour: "numeric", minute: "numeric" };
    let timestring = launchDateTime.toLocaleDateString(undefined, timeOptions);
    addDateText(stack, timestring);
  } else if (precision == "day") {
    // Add launch date
    const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    let datestring = launchDateTime.toLocaleDateString(undefined, dateOptions);
    addDateText(stack, datestring);
  } else {
    addDateText(stack, "No day for next launch given");
  }
}

await CreateWidget();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();
