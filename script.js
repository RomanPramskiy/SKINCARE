const selectorbuttons = document.querySelectorAll('.skin-care__selector-button');
const selectortitle = document.querySelector('.skin-care__choose-text');
const nextbutton = document.querySelector('.skin-care__swap-button_next');
const backbutton = document.querySelector('.skin-care__swap-button_back');
const selectorblock = document.querySelector('.skin-care__selector-block');
const imageBlocks = document.querySelectorAll('.skin-care__image-block');
const indicators = document.querySelectorAll('.skin-care__line');
const steps = [
    {
      title: 'Choose a skin concern',
      options: ['Acne', 'Sensitivity', 'Skintone & Texture', 'Balance & Hydration']
    },
    {
      title: 'Define a skin goal',
      options: ['Treat & minimize breakouts', 'Fade Acne Scars', 'Get rid of Blackheads', 'Keep Acne at Bay', 'Restore Skin Post-Acne Medication']
    }
  ];
  let currentStep = 0;

  function createButton(text) { // функция отрисовки кнопок
    const button = document.createElement('button');
    button.classList.add('skin-care__selector-button');
    button.innerHTML = `<div class="skin-care__selector-circle"><img src="images/selector__check-mark.svg" alt="check-mark" class="skin-care__selector-image"></div> <span class="skin-care__selector-text">${text}</span>`;
 
    // переключатель с белых на красные кнопки
    button.addEventListener('click', () => {
      button.classList.toggle('skin-care__selector-button--active');
      const circle = button.querySelector('.skin-care__selector-circle');
      if (circle) circle.classList.toggle('skin-care__selector-circle--active');
    });
    return button;
  }
  function updateStaticButtons() {
    staticButtons = Array.from(selectorblock.querySelectorAll('.skin-care__selector-button'));
  }
  function renderFirstStep() {
    const step = steps[0];
  
    selectorblock.innerHTML = '';
  
    step.options.slice(0, 4).forEach(text => {
      const btn = createButton(text);
      selectorblock.appendChild(btn);
    });
    updateStaticButtons();
  }

  
  function renderStep(direction) {
    // Анимация заголовка
    selectortitle.classList.remove('skin-care__fade-in-title');
    selectortitle.classList.add('skin-care__fade-out-title');

    indicators.forEach((line) => {
        line.classList.remove('skin-care__line--active');
        line.classList.add('skin-care__fade-in');
    
        // Убираем fade-out после анимации
        setTimeout(() => line.classList.remove('skin-care__fade-out-line'), 400);
        const targetLine = indicators[currentStep];
        targetLine.classList.add('skin-care__fade-out-line');
      
        setTimeout(() => {
          targetLine.classList.remove('skin-care__fade-out-line');
          targetLine.classList.add('skin-care__line--active');
        }, 10);
      });


    if (direction === 'next') {
      const firstbutton = staticButtons[0];
      const moveButtons = staticButtons.slice(1);
      const currentButtons = document.querySelectorAll('.skin-care__selector-button').length - 1;
      const requiredButtons = steps[currentStep].options.length;

      moveButtons.forEach((button, index) => {
      button.classList.add('skin-care__fade-in-move');
      const oldSpan = button.querySelector('.skin-care__selector-text');
      if (oldSpan) {
        oldSpan.classList.add('skin-care__fade-out');
        setTimeout(() => oldSpan.remove(), 400);
      }
      const newSpan = document.createElement('span');
      newSpan.classList.add('skin-care__selector-text');
      newSpan.classList.add('skin-care__fade-in');
      newSpan.textContent = steps[currentStep].options[index];
      button.appendChild(newSpan);
      });
      firstbutton.classList.add('skin-care__fade-out-option');

      if (requiredButtons > currentButtons) {
        const missingCount = requiredButtons - currentButtons;
        for (let i = 0; i < missingCount; i++) {
          const optionText = steps[currentStep].options[currentButtons + i];
          const newButton = createButton(optionText);
      
          newButton.classList.add('skin-care__fade-in-move-new');
          newButton.classList.add('new-buttons');
          selectorblock.appendChild(newButton);
          setTimeout(() => newButton.classList.remove('skin-care__fade-in-move-new'), 400);
        }
      }
      // Ждём завершения анимации, потом удаляем
      setTimeout(() => {
        firstbutton.remove();
        updateStaticButtons();
        moveButtons.forEach(button => {
          button.classList.remove('skin-care__fade-in-move');
          });
      }, 400);
    } else if (direction === 'back') {
      const moveButtons = staticButtons.slice(0, 3);

      const firstbutton = createButton(steps[currentStep].options[0]); // создаем первую кнопку прошлого
      firstbutton.classList.add('skin-care__fade-in-option');
      moveButtons.forEach((button, index) => {
        button.classList.add('skin-care__fade-out-move');
        const oldSpan = button.querySelector('.skin-care__selector-text');
        if (oldSpan) {
          oldSpan.classList.add('skin-care__fade-out');
          setTimeout(() => oldSpan.remove(), 400);
        }
        const newSpan = document.createElement('span');
        newSpan.classList.add('skin-care__selector-text');
        newSpan.classList.add('skin-care__fade-in');
        newSpan.textContent = steps[currentStep].options[index + 1];
        button.appendChild(newSpan);
        });
      selectorblock.prepend(firstbutton);

      document.querySelectorAll('.new-buttons').forEach(button => {
        button.classList.add('skin-care__fade-out-move-new');
        setTimeout(() => button.remove(), 400);
      });
      updateStaticButtons();
      setTimeout(() => {
        firstbutton.classList.remove('skin-care__fade-in-option');
        moveButtons.forEach(button => {
          button.classList.remove('skin-care__fade-out-move');
          });
      }, 400);
    }




        // меняем блок с изображениями
        imageBlocks.forEach((block, index) => {
          if (index === currentStep) {
            block.classList.add('skin-care__image-block--active');
          } else {
            block.classList.remove('skin-care__image-block--active');
          }
        });
        backbutton.style.display = currentStep > 0 ? 'flex' : 'none';
    setTimeout(() => {
      // Меняем и анимируем заголовок
      selectortitle.textContent = steps[currentStep].title;
      selectortitle.classList.remove('skin-care__fade-out-title');
      selectortitle.classList.add('skin-care__fade-in-title');
    }, 300);
}



    // обработчик клика для кнопок
  nextbutton.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderStep('next');
    }
  });
  backbutton.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep('back');
      }
  });


  document.addEventListener('DOMContentLoaded', () => {
    renderFirstStep();
  });
  renderStep();