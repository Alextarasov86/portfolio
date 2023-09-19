document.addEventListener('DOMContentLoaded', function(){
    
    const headerMenu = document.querySelector('#header-menu');
    const navIcon = document.querySelector('.nav-icon');
    const bodyEl = document.body;

    navIcon.addEventListener('click', function(){
        if(this.classList.contains('nav-icon--active')){
            this.classList.remove('nav-icon--active');
            headerMenu.classList.remove('open');
            bodyEl.classList.remove('lock');
        } else {
            this.classList.add('nav-icon--active');
            headerMenu.classList.add('open');
            bodyEl.classList.add('lock')
        }
    });

    headerMenu.addEventListener('click', function() {
        this.classList.remove('open');
        navIcon.classList.remove('nav-icon--active');
        bodyEl.classList.remove('lock');
    })

    // Form

    const formInput = document.querySelectorAll('.input__field');
    
    formInput.forEach(function(item){
        const thisParent = item.closest(".form__input");
        const thisPlaceholder = thisParent.querySelector(".input__name");

        item.addEventListener('focus', function(){
            thisPlaceholder.classList.add("active")
            item.classList.add('active');
        })
        item.addEventListener('blur', function(){
            if(item.value.length > 0){
                thisPlaceholder.classList.add('active');
            } else {
                thisPlaceholder.classList.remove('active');
                item.classList.remove('active');
            }
        })
    })

     //FORM VALIDATE
	$('.contacts__form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'отсутсвует символ @'
			},
			
			message: {
				required: 'Поле не должно быть пустым'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	});

	//*************************************************** */
	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".contacts__form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".contacts__form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}

})