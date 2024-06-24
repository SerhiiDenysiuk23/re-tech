const optionsCreate = (options) => {
  return options.map((item, index) => `<div class="option" data-value="${index + 1}">${item}</div>`)
}

const pickupPoints = [
  "вул. Велика Васильківська, 33, Київ",
  "ТРЦ Блокбастер, пр. Степана Бандери, 36, Київ",
  "ТРЦ Лавіна Молл, вул. Берковецька, 6Д, Київ"
]

const npRegions = [
  "АРК",
  "Вінницька область",
  "Волинська область",
  "Дніпропетровська область",
  "Донецька область",
  "Житомирська область",
  "Закарпатська область",
  "Запорізька область",
  "Івано-Франківська область",
  "Київська область",
  "Кіровоградська область",
  "Луганська область",
  "Львівська область",
  "Миколаївська область",
  "Одеська область",
  "Полтавська область",
  "Рівненська область",
  "Сумська область",
  "Тернопільська область",
  "Харківська область",
  "Херсонська область",
  "Хмельницька область",
  "Черкаська область",
  "Чернівецька область",
  "Чернігівська область"
];

const locality = Array.from({length: 20}, (_, i) => `Населений пункт ${i + 1}`);

const branch = Array.from({length: 20}, (_, i) => `Відділення ${i + 1}`);

const banks = [
  "Приват Банк",
  "Idea Bank"
]

const privateBankParts = [
  "3 платежі",
  "6 платежів"
]

const ideaBankParts = [
  "4 платежі",
  "6 платежів",
  "12 платежів",
  "24 платежів",
  "36 платежів"
]

function updateActiveSection() {
  const selectedValue = $('input[name="delivery_method"]:checked').val();

  $('.get-product-details').removeClass('active');


  switch (selectedValue) {
    case 'pickup':
      $('#pickup-point-section').addClass('active');
      break
    case 'novaposhta_wh_wh':
      $('#nova-post-section').addClass('active');
      break
    case 'delivery_kyiv':
      $('#delivery_kyiv-section').addClass('active');
      break
    default:
      return

  }
}


$(document).ready(function () {
  $("#pickup-point-select .options").append(optionsCreate(pickupPoints).join(""));
  $("#np-region-select .options").append(optionsCreate(npRegions).join(""));
  $("#np-locality-select .options").append(optionsCreate(locality).join(""));
  $("#np-branch-select .options").append(optionsCreate(branch).join(""));

  $("#payments_method_pay_parts_bank .options").append(optionsCreate(banks).join(""));

  $('input[name="delivery_method"]').change(function () {
    updateActiveSection();
  });

  $('input[name="payments"]').change(function () {
    updateActiveSection();
    const selectedValue = $('input[name="payments"]:checked').val();
    if (selectedValue === "pay_parts") {
      $('.pay-parts-info').removeClass('hidden');
    } else {
      $('.pay-parts-info').addClass('hidden');
    }
  });

  $('#payments_method_pay_parts_bank-select .option').on("click", function () {
    const $parts_product = $("#payments_method_pay_parts_product .options")
    const defaultOption = `<div class="option selected" data-value="">Кількість платежів</div>`

    $parts_product.empty()

    switch ($(this).data("value")) {
      case 1:
        $parts_product.append([defaultOption, ...optionsCreate(privateBankParts)].join(""));
        break
      case 2:
        $parts_product.append([defaultOption,...optionsCreate(ideaBankParts)].join(""));
        break
      default: {
        $parts_product.append(defaultOption);
      }
        break
    }

    setTimeout(() => {
      $("#payments_method_pay_parts_product .select-trigger").html("Кількість платежів");

    }, 0)

  })

  function toggleNextBlockVisibility(currentBlockId, nextBlockId) {
    setTimeout(function () {
      const selectedOption = $(`#${currentBlockId} .option.selected`).data("value");
      if (selectedOption !== "") {
        $(`#${nextBlockId}`).closest('.nova-post-info').removeClass("hidden");
      } else {
        hideAndResetFollowingBlocks(nextBlockId);
      }
    }, 0);
  }


  function hideAndResetFollowingBlocks(startingBlockId) {
    const nextBlockIds = {
      "np-region-select": "np-locality-select",
      "np-locality-select": "np-branch-select"
    };

    let currentBlockId = startingBlockId;
    while (currentBlockId) {
      const blockElement = $(`#${currentBlockId}`);
      blockElement.closest('.nova-post-info').addClass("hidden");

      resetToFirstOption(blockElement);

      currentBlockId = nextBlockIds[currentBlockId];
    }
  }

  function resetToFirstOption(selectElement) {
    const firstOption = selectElement.find(".options .option").first();
    selectElement.find(".option").removeClass("selected");
    firstOption.addClass("selected");
    selectElement.find(".select-trigger").html(firstOption.text());
  }

  $("#np-region-select").on("click", ".option", function () {
    toggleNextBlockVisibility("np-region-select", "np-locality-select");
  });

  $("#np-locality-select").on("click", ".option", function () {
    toggleNextBlockVisibility("np-locality-select", "np-branch-select");
  });
})
