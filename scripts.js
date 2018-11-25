// Supported widgets
const widgets = ['Clock', 'Weather', 'News', 'Calendar', 'Subreddit'];

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
        Top Left Widget: <br />
        Top Right Widget: <br />
        Bottom Right Widget: <br />
        Bottom Left Widget: <br />`);
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

  // Top Left
  let tl = $('<select></select>')
    .addClass('widgets')
    .prop('id', `tl-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', '')
        .append('Empty')
    );

  // Top Right
  let tr = $('<select></select>')
    .addClass('widgets')
    .prop('id', `tr-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', '')
        .append('Empty')
    );

  // Bottom Right
  let br = $('<select></select>')
    .addClass('widgets')
    .prop('id', `br-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', '')
        .append('Empty')
    );

  // Bottom Left
  let bl = $('<select></select>')
    .addClass('widgets')
    .prop('id', `bl-${userId}`)
    .append(
      $('<option></option>')
        .prop('value', '')
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
  }
  inputsField.append(tl).append('<br />');
  inputsField.append(tr).append('<br />');
  inputsField.append(br).append('<br />');
  inputsField.append(bl).append('<br />');

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

    user['widgets'] = [
      $(`#tl-${i}`).val(),
      $(`#tr-${i}`).val(),
      $(`#br-${i}`).val(),
      $(`#bl-${i}`).val()
    ];

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

    $(`#tl-${userId} option:eq(${user.widgets[0] + 1})`).prop('selected', true);
    $(`#tr-${userId} option:eq(${user.widgets[1] + 1})`).prop('selected', true);
    $(`#br-${userId} option:eq(${user.widgets[2] + 1})`).prop('selected', true);
    $(`#bl-${userId} option:eq(${user.widgets[3] + 1})`).prop('selected', true);

    userId++;
  }
};
