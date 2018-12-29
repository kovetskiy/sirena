'use strict';

const electron = require('electron');
const ipc = electron.ipcRenderer;

const $ = require('jquery');

electron.remote.getCurrentWindow().toggleDevTools();

var $activeItem = null;
function bindItem($item) {
	$item.click(() => {
		if ($activeItem != null) {
			$activeItem.removeClass('is-active');
		}

		$activeItem = $item;

		$activeItem.addClass('is-active');

		ipc.send('carcosa:get', $item.text());
	})
};

ipc.on('carcosa:list', (event, result) => {
	var $list = $('#carcosa-list');
	$list.empty();

	$(result).each((i, item) => {
		var $item = $('<a class="panel-block" />');
		$item.text(item);

		bindItem($item);

		$list.append($item);
	})
})

ipc.on('carcosa:get', (event, result) => {
	var $value = $('#carcosa-value');
	$value.text(result);
})

ipc.send('carcosa:list')
