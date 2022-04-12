// JScript File

// HH.exe does not open links with anchor hash #anchor

function goHash()
{
  var srcElement = event.srcElement;
  if (srcElement)
  {
    var href = srcElement.getAttribute("href");
    var target = srcElement.getAttribute("target");
    window.open(href, target);
    return false;
  }
}

function exec()
{
  try
  {
    var texteval = document.getElementById("texteval");
    eval(texteval.innerText);
  }
  catch (ex)
  {
    // TODO: better handing
    alert(ex);
  }
}

function showEval()
{
  try
  {
    var div = document.getElementById("evaldiv");
    div.innerHTML = '<textarea id="texteval" cols="140" rows="20"></textarea><br/><button onclick="exec()">exec</button>';
  }
  catch (ex)
  {
    // TODO: better handing
    alert(ex);
  }

}

