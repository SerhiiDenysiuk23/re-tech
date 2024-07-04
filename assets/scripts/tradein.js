const optionsCreate = (options) => {
  return options.map((item, index) => `<div class="option" data-value="${index + 1}">${item}</div>`)
}

const roms = [
  "32 ГБ",
  "64 ГБ",
  "124 ГБ",
  "258 ГБ",
  "512 ГБ",
  "1 ТБ"
]
const rams = [
  "4 ГБ",
  "8 ГБ",
  "16 ГБ",
  "32 ГБ",
  "64 ГБ",
]

const iPhoneVersions = [
  "e-Sim",
  "Global"
]

const iPadCommunications = [
  "Wi-Fi / LTE",
  "Лише Wi-Fi"
]

const macYear = [
  "2019 рік",
  "2021 рік (Apple M1)",
  "2023 рік (Apple M2)"
]

const iPhoneModels = Array.from({length: 5}, (_, i) => `iPhone ${i + 11}`);
const iPadModels = Array.from({length: 5}, (_, i) => `iPad ${i + 11}`);
const macModels = Array.from({length: 5}, (_, i) => `MacBook ${i + 11}`);
const appleWatchModels = Array.from({length: 10}, (_, i) => `Apple Watch Series ${i + 1}`);



$(document).ready(function (){
  let isMac = false

  const toggleMapping = () => ({
    "old-model-select": isMac ? "old-other-select" : "old-rom-select",
    "old-rom-select": isMac ? "old-ram-select" : "old-other-select",
    "old-other-select": isMac ? "old-rom-select" : "old-ram-select",
    "old-ram-select": null,
  })


  const showBlocks = (indices, className) => {
    $('.old-params .sort-container').hide();
    indices.forEach(index => {
      $(`.old-params .sort-container:eq(${index})`).show().attr('class', `col-md-${className} sort-container`);
    });
  }

  const reorderBlocks = (blockIds) => {
    const $parent = $('.old-params .row');
    blockIds.forEach((id, index) => {
      const $block = $(`#${id}`).closest('.sort-container');
      if (index === 0) {
        $parent.prepend($block);
      } else {
        $parent.append($block);
      }
    });
  }

  const toggleNextBlockDisable = (currentBlockId, nextBlockId) => {
    setTimeout(function () {
      const selectedOption = $(`#${currentBlockId} .option.selected`).data("value");
      const $nextBlock = $(`#${nextBlockId}`);
      if (selectedOption !== "") {
        $nextBlock.closest('.sort-container .select-wrapper').removeAttr("data-disabled");
        $nextBlock.find('.search-box').removeAttr("disabled");
      } else {
        disableAndResetFollowingBlocks(nextBlockId);
      }
    }, 0);
  }

  const disableAndResetFollowingBlocks = (startingBlockId) => {
    const nextBlockIds = toggleMapping()

    let currentBlockId = startingBlockId;
    while (currentBlockId) {
      const blockElement = $(`#${currentBlockId}`);
      blockElement.closest('.select-wrapper').attr("data-disabled", "true");
      blockElement.find('.search-box').prop("disabled", "true");

      resetToFirstOption(blockElement);
      currentBlockId = nextBlockIds[currentBlockId];
    }
  }

  const resetToFirstOption = (selectElement) => {
    const firstOption = selectElement.find(".options .option").first();
    selectElement.find(".option").removeClass("selected");
    firstOption.addClass("selected");
    selectElement.find(".search-box").val("");
  }

  $('input[name="old-gadget"]').change(function () {
    const selectedId = $(this).attr('id');


    const $otherSelect = $("#old-other-select")
    const $modelSelect = $("#old-model-select")
    const defaultModelOption = `<div class="option selected" data-value="">Оберіть модель</div>`
    const defaultRomOption = `<div class="option selected" data-value="">Об'єм пам'яті</div>`
    const defaultRamOption = `<div class="option selected" data-value="">Оперативна пам'ять</div>`



    $("#old-rom-select").find('.options').html([defaultRomOption, ...optionsCreate(roms)]);
    $("#old-ram-select").find('.options').html([defaultRamOption, ...optionsCreate(rams)]);

    reorderBlocks(['old-model-select', 'old-rom-select', 'old-other-select', 'old-ram-select']);
    isMac = false

    switch (selectedId) {
      case 'ipad-old':{
        showBlocks([0, 1, 2], 4);
        const defaultOtherOption = `<div class="option selected" data-value="">Комунікації</div>`
        $otherSelect.find('.options').html([defaultOtherOption, ...optionsCreate(iPadCommunications)]);
        $otherSelect.find('.search-box').attr('placeholder', 'Комунікації');
        $modelSelect.find('.options').html([defaultModelOption, ...optionsCreate(iPadModels)]);
      }break;
      case 'mac-old':{
        showBlocks([0, 1, 2, 3], 3);
        reorderBlocks(['old-model-select', 'old-other-select', 'old-rom-select', 'old-ram-select']);
        isMac = true
        const defaultOtherOption = `<div class="option selected" data-value="">Рік випуску</div>`
        $otherSelect.find('.options').html([defaultOtherOption, ...optionsCreate(macYear)]);
        $otherSelect.find('.search-box').attr('placeholder', 'Рік випуску');
        $modelSelect.find('.options').html([defaultModelOption,...optionsCreate(macModels)]);
      }break;
      case 'apple-watch-old':{
        showBlocks([0], 4);
        $otherSelect.find('.options').html("");
        $modelSelect.find('.options').html([defaultModelOption, ...optionsCreate(appleWatchModels)]);
      }break;
      case "iphone-old":
      default:{
        showBlocks([0, 1, 2], 4);
        const defaultOtherOption = `<div class="option selected" data-value="">Версія</div>`
        $otherSelect.find('.options').html([defaultOtherOption, ...optionsCreate(iPhoneVersions)]);
        $otherSelect.find('.search-box').attr('placeholder', 'Версія');
        $modelSelect.find('.options').html([defaultModelOption, ...optionsCreate(iPhoneModels)]);
      }break;
    }


    $modelSelect.find(".select-trigger").val("");
    disableAndResetFollowingBlocks("old-rom-select")

  });

  $(".select").on("click", ".option", function () {
    const $this = $(this);
    const $select = $this.closest('.select');
    const selectId = $select.attr('id');

    $select.find('.option').removeClass('selected');
    $this.addClass('selected');
    $select.find('.search-box').val($this.text());

    const nextSelectId = toggleMapping()[selectId];
    if (!nextSelectId)
      return

    if (nextSelectId) {
      toggleNextBlockDisable(selectId, nextSelectId);
    } else {
      disableAndResetFollowingBlocks("old-model-select");
      toggleNextBlockDisable("old-model-select", isMac ? "old-other-select" : "old-rom-select");
    }

  });

  $('input[name="old-gadget"]:checked').change();
})