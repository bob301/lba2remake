export const dbgHUD = {
    root: null,

    content: null,
    macros: null,
    expressions: null,
    input: null,
    completion: null,

    popup: null,
    popup_save: null,
    popup_input: null,
    popup_content: null,

    confirm: null,
    confirm_content: null,
    confirm_cancel: null,
    confirm_OK: null,
};

export function initHUDElements() {
    dbgHUD.root = document.getElementById('dbgHUD');

    dbgHUD.content = document.getElementById('dbgHUD_content');
    dbgHUD.macros = document.getElementById('dbgHUD_macros');
    dbgHUD.expressions = document.getElementById('dbgHUD_expressions');
    dbgHUD.input = document.getElementById('dbgHUD_input');
    dbgHUD.completion = document.getElementById('dbgHUD_completion');

    dbgHUD.popup = document.getElementById('dbgHUD_popup');
    dbgHUD.popup_save = document.getElementById('dbgHUD_popup_save');
    dbgHUD.popup_input = document.getElementById('dbgHUD_popup_input');
    dbgHUD.popup_content = document.getElementById('dbgHUD_popup_content');

    dbgHUD.confirm = document.getElementById('dbgHUD_confirm');
    dbgHUD.confirm_content = document.getElementById('dbgHUD_confirm_content');
    dbgHUD.confirm_cancel = document.getElementById('dbgHUD_confirm_cancel');
    dbgHUD.confirm_OK = document.getElementById('dbgHUD_confirm_OK');
}