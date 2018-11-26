// Supported widgets
const widgets = ['Clock', 'Weather', 'News', 'Calendar', 'Subreddit', 'Destination'];

$(document).ready(function() {
  document.getElementById('file-input').addEventListener('change', readSingleFile, false);

  createUser();
});

const userFields = [];

const createUser = () => {
  // Populate user input fields
  let userInputs = $('#user-inputs');

  let userId = userFields.length;
  let user = $('<div></div>')
    .addClass('user')
    .prop('id', `user-${userId}`);
  userInputs.append(user);
  let inputsText = $('<span></span>').addClass('inputs-text').append(`Name: <br />
        Zip Code: <br />
        Subreddit: <br />
        Google Calendar: <br />
        Destination URL: <br />
        Destination Name: <br />
        Top Left Widget: <br />
        Top Right Widget: <br />
        Bottom Right Widget: <br />
        Bottom Left Widget: <br />
        Top Widget: <br />
        Right Widget: <br />
        Bottom Widget: <br />
        Left Widget: <br />`);
  user.append(inputsText);
  let inputsField = $('<span></span>').addClass('inputs-field');
  user.append(inputsField);

  // Name
  inputsField
    .append(
      $('<input />')
        .addClass('input')
        .prop('id', `name-${userId}`)
        .prop('type', 'text')
    )
    .append('<br />');

  // Zip Code
  inputsField
    .append(
      $('<input />')
        .addClass('input')
        .prop('id', `zip-${userId}`)
        .prop('type', 'text')
    )
    .append('<br />');

  // Subreddit
  inputsField
    .append(
      $('<input />')
        .addClass('input')
        .prop('id', `sub-${userId}`)
        .prop('type', 'text')
    )
    .append('<br />');

  // Calendar Email
  inputsField
    .append(
      $('<input />')
        .addClass('input')
        .prop('id', `cal-${userId}`)
        .prop('type', 'text')
    )
    .append('<br />');

  // Destination Url
  inputsField
    .append(
      $('<input />')
        .addClass('input')
        .prop('id', `dest-${userId}`)
        .prop('type', 'text')
    )
    .append('<br />');

  // Destination Name
  inputsField
    .append(
      $('<input />')
        .addClass('input')
        .prop('id', `destname-${userId}`)
        .prop('type', 'text')
    )
    .append('<br />');

  // Top Left
  let tl = $('<select></select>')
    .addClass('widgets')
    .prop('id', `tl-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', -1)
        .append('Empty')
    );

  // Top Right
  let tr = $('<select></select>')
    .addClass('widgets')
    .prop('id', `tr-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', -1)
        .append('Empty')
    );

  // Bottom Right
  let br = $('<select></select>')
    .addClass('widgets')
    .prop('id', `br-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', -1)
        .append('Empty')
    );

  // Bottom Left
  let bl = $('<select></select>')
    .addClass('widgets')
    .prop('id', `bl-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', -1)
        .append('Empty')
    );

  // Top
  let t = $('<select></select>')
    .addClass('widgets')
    .prop('id', `t-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', -1)
        .append('Empty')
    );

  // Right
  let r = $('<select></select>')
    .addClass('widgets')
    .prop('id', `r-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', -1)
        .append('Empty')
    );

  // Bottom
  let b = $('<select></select>')
    .addClass('widgets')
    .prop('id', `b-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', -1)
        .append('Empty')
    );

  // Left
  let l = $('<select></select>')
    .addClass('widgets')
    .prop('id', `l-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', -1)
        .append('Empty')
    );

  // Populate objects
  for (let widget of widgets) {
    tl.append(
      $('<option></option>')
        .prop('value', widgets.indexOf(widget))
        .append(widget)
    );

    tr.append(
      $('<option></option>')
        .prop('value', widgets.indexOf(widget))
        .append(widget)
    );

    br.append(
      $('<option></option>')
        .prop('value', widgets.indexOf(widget))
        .append(widget)
    );

    bl.append(
      $('<option></option>')
        .prop('value', widgets.indexOf(widget))
        .append(widget)
    );

    t.append(
      $('<option></option>')
        .prop('value', widgets.indexOf(widget))
        .append(widget)
    );

    r.append(
      $('<option></option>')
        .prop('value', widgets.indexOf(widget))
        .append(widget)
    );

    b.append(
      $('<option></option>')
        .prop('value', widgets.indexOf(widget))
        .append(widget)
    );

    l.append(
      $('<option></option>')
        .prop('value', widgets.indexOf(widget))
        .append(widget)
    );
  }
  inputsField.append(tl).append('<br />');
  inputsField.append(tr).append('<br />');
  inputsField.append(br).append('<br />');
  inputsField.append(bl).append('<br />');
  inputsField.append(t).append('<br />');
  inputsField.append(r).append('<br />');
  inputsField.append(b).append('<br />');
  inputsField.append(l).append('<br />');

  userFields.push(user);
};

const deleteUser = () => {
  userFields[userFields.length - 1].remove();
  userFields.splice(userFields.length - 1);
};

const download = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

const createConfig = () => {
  let apiKeys = {};

  if ($('#api-news').val() != '') {
    apiKeys['news'] = $('#api-news').val();
  }

  if ($('#api-weather').val() != '') {
    apiKeys['weather'] = $('#api-weather').val();
  }

  if ($('#api-google').val() != '') {
    apiKeys['cal'] = $('#api-google').val();
  }

  if ($('#api-importio').val() != '') {
    apiKeys['importio'] = $('#api-importio').val();
  }

  let users = [];

  for (let i = 0; i < userFields.length; i++) {
    let user = {};

    user['name'] = $(`#name-${i}`).val();
    user['location'] = $(`#zip-${i}`).val();
    user['subreddit'] = $(`#sub-${i}`).val();
    user['calendar'] = $(`#cal-${i}`).val();
    user['destination'] = $(`#dest-${i}`).val();
    user['destination_name'] = $(`#destname-${i}`).val();

    user['widgets'] = [$(`#tl-${i}`).val(), $(`#tr-${i}`).val(), $(`#br-${i}`).val(), $(`#bl-${i}`).val()];
    user['widgets2'] = [$(`#t-${i}`).val(), $(`#r-${i}`).val(), $(`#b-${i}`).val(), $(`#l-${i}`).val()];

    users.push(user);
  }

  let config = { apiKeys, users };

  download(JSON.stringify(config), 'config.json', 'text/plain');
};

const readSingleFile = e => {
  const file = e.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    loadConfig(e.target.result);
  };
  reader.readAsText(file);
};

const loadConfig = contents => {
  let config = JSON.parse(contents);
  const { apiKeys, users } = config;
  console.log(config);

  // Load API Keys
  $('#api-news').val(apiKeys.news);
  $('#api-weather').val(apiKeys.weather);
  $('#api-google').val(apiKeys.cal);
  $('#api-importio').val(apiKeys.importio);

  let userId = 0;

  for (let user of users) {
    console.log(user);
    if (!userFields[userId]) {
      createUser();
    }

    $(`#name-${userId}`).val(user.name);
    $(`#zip-${userId}`).val(user.location);
    $(`#sub-${userId}`).val(user.subreddit);
    $(`#cal-${userId}`).val(user.calendar);

    $(`#dest-${userId}`).val(user.destination);
    $(`#destname-${userId}`).val(user.destination_name);

    $(`#tl-${userId} option:eq(${parseInt(user.widgets[0]) + 1})`).prop('selected', true);
    $(`#tr-${userId} option:eq(${parseInt(user.widgets[1]) + 1})`).prop('selected', true);
    $(`#br-${userId} option:eq(${parseInt(user.widgets[2]) + 1})`).prop('selected', true);
    $(`#bl-${userId} option:eq(${parseInt(user.widgets[3]) + 1})`).prop('selected', true);

    $(`#t-${userId} option:eq(${parseInt(user.widgets2[0]) + 1})`).prop('selected', true);
    $(`#r-${userId} option:eq(${parseInt(user.widgets2[1]) + 1})`).prop('selected', true);
    $(`#b-${userId} option:eq(${parseInt(user.widgets2[2]) + 1})`).prop('selected', true);
    $(`#l-${userId} option:eq(${parseInt(user.widgets2[3]) + 1})`).prop('selected', true);

    userId++;
  }
};
