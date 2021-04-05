(function($) {
    var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', "#472E32", "#FF4136", "#39CCCC", "#BDBB99", "#77B1A9", "#73A857"];
    var username = '';
    var myColor;
    var all_questions = [{
        question_string: "Pengertian uang menurut ilmu ekonomi modern ialah ...",
        choices: {
            correct: "Uang sebagai alat pembayaran transaksi jual beli atas barang dan jasa, serta kekayaan atau aset berharga lainnya, dan juga sebagai alat pembayaran utang",
            wrong: ["Alat tukar", "Uang merupakan alat tukar yang sah dan digunakan oleh seluruh masyarakat", "Uang adalah benda yang diterima masyarakat umum sebagai alat tukar dalam kegiatan ekonomi"]
        }
    }, {
        question_string: "Berikut ini adalah syarat benda yang dapat dijadikan uang, kecuali ...",
        choices: {
            correct: "Kualitasnya cenderung lebih tinggi",
            wrong: ["Tahan lama", "Dapat diterima secara umum", "Jumlahnya dapat memenuhi kebutuhan masyarakat"]
        }
    }, {
        question_string: "Yang termasuk fungsi asli uang adalah ...",
        choices: {
            correct: "Uang sebagai alat tukar guna mempermudah kita untuk mendapatkan suatu barang",
            wrong: ["Uang sebagai alat pembayaran utang digunakan untuk melunasi utang piutang", "Uang sebagai penunjuk harga memiliki nilai yang berbeda-beda", "Uang sebagai alat pembayaran berbeda dengan uang sebagai alat tukar"]
        }
    }, {
        question_string: "Salah satu jenis uang berdasarkan kawasan adalah uang regional. Yang dimaksud uang regional adalah ...",
        choices: {
            correct: "Uang yang berlaku di suatu kawasan yang lebih luas daripada uang lokal",
            wrong: ["Uang yang berlaku di seluruh dunia sebagai standar pembayaran", "Uang yang hanya berlaku di satu negara tertentu", "Uang yang hanya berlaku di satu benua tertentu"]
        }
    }, {
        question_string: "Uang yang nilai intrinsiknya sama dengan nilai nominalnya dan bernilai penuh biasanya terdapat pada uang logam mulia yang terbuat dari bahan emas atau perak. Berdasarkan pernyataan tersebut merupakan jenis uang jika dilihat dari ...",
        choices: {
            correct: "Berdasarkan nilai",
            wrong: ["Berdasarkan kebutuhan", "Berdasarkan bahan pembuatnya", "Berdasarkan kualitas"]
        }
	}, {
        question_string: "Cek, giro, traveler’s cheque, kartu kredit, kartu debit, dan sebagainya biasa disebut uang ...",
        choices: {
            correct: "Uang giral",
            wrong: ["Pengganti uang tunai", "Uang kartal", "Uang tidak tunai"]
        }
	}, {
        question_string: "Nilai yang dapat diukur dengan jumlah barang dan jasa yang dapat ditukar dengan uang disebut nilai ...",
        choices: {
            correct: "Riil",
            wrong: ["Nominal", "Intrinsik", "Besar uang"]
        }
	}, {
		question_string: "Berikut yang termasuk teori-teori yang terdapat dalam teori uang dinamis adalah ...",
		choices: {
			correct: "Teori kuantitas, teori persediaan kas, teori ongkos produksi",
			wrong: ["Teori negara, teori metalisme, teori nominalisme", "Teori konvensi, teori metalisme, teori ongkos produksi", "Teori negara, teori metalisme, teori konvensi"]
		} 
	}, {
		question_string: "Berikut yang termasuk teori-teori yang terdapat dalam teori uang statis adalah ...",
		choices: {
			correct: "Teori negara, teori metalisme, teori nominalisme",
			wrong: ["Teori kuantitas, teori persediaan kas, teori ongkos produksi", "Teori negara, teori metalisme, teori konvensi", "Teori konvensi, teori metalisme, teori ongkos produksi"]
		}
	}, {
		question_string: "Nilai uang dalam peredaran yang berasal dari logam dan uang itu dapat dipandang sebagai barang merupakan pengertian teori ...",
		choices: {
			correct: "Teori ongkos produksi",
			wrong: ["Teori metalisme", "Teori konvensi", "Teori negara"]
	}  
    }];

    function changeColor() {
        myColor = colors[Math.floor(Math.random() * colors.length)];
        $('body').css('background-color', myColor);
        $('.quiz-box').css('color', '#fff');
        //$('.option-input:checked::after').css('background', myColor);
    };

    // An object for a Quiz, which will contain Question objects.
    var Quiz = function(quiz_name) {
            // Private fields for an instance of a Quiz object.
            this.quiz_name = quiz_name;

            // This one will contain an array of Question objects in the order that the questions will be presented.
            this.questions = [];
        }
        // A function that you can enact on an instance of a quiz object. This function is called add_question() and takes in a Question object which it will add to the questions field.
    Quiz.prototype.add_question = function(question) {
        // Randomly choose where to add question
        //var index_to_add_question = Math.floor(Math.random() * this.questions.length);
        var index_to_add_question = this.questions.length;
        this.questions.splice(index_to_add_question--, 0, question);
    }
    Quiz.prototype.render = function(container) {

        changeColor();

        // For when we're out of scope
        var self = this;

        // Hide the quiz results modal
        //$('#quiz-results').hide();

        // Write the name of the quiz
        //$('#quiz-name').text(this.quiz_name);

        // Create a container for questions
        var question_container = $('<div>').attr('id', 'question').appendTo(container);

        // Helper function for changing the question and updating the buttons
        function change_question() {

            self.questions[current_question_index].render(question_container);
            $('#prevButton').prop('disabled', current_question_index === 0);
            $('#nextButton').prop('disabled', current_question_index === self.questions.length - 1);

            // Determine if all questions have been answered
            var all_questions_answered = true;
            for (var i = 0; i < self.questions.length; i++) {
                if (self.questions[i].user_choice_index === null) {
                    all_questions_answered = false;
                    break;
                }
            }
            $('#submit-button').prop('disabled', !all_questions_answered);
        }

        // Render the first question
        var current_question_index = 0;
        change_question();

        // Add listener for the previous question button
        $('#prevButton').click(function() {
            if (current_question_index > 0) {
                current_question_index--;
                change_question();
            }
        });

        // Add listener for the next question button
        $('#nextButton').click(function() {
            if (current_question_index < self.questions.length - 1) {
                current_question_index++;
                change_question();
                changeColor();
            }
        });

        // Add listener for the submit answers button
        $('#submitButton').click(function() {
            changeColor();
            // Determine how many questions the user got right
            var score = 0;
            for (var i = 0; i < self.questions.length; i++) {
                if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
                    score++;
                }
            }

            // Display the score with the appropriate message
            var percentage = (score / self.questions.length);

            var scoremessage = score + " dari " + self.questions.length + " Jawaban Anda Benar.";
            var icon = '';
            var chartcolor = '';
            console.log(percentage);

            $('.percentage').data('percent', percentage * 100);
            $('.percentage span').text(percentage);

            var message;
            if (percentage === 1) {
                icon = "fa fa-smile-o";
                message = 'Kerja Yang Bagus!';
                chartcolor = "green";
            } else if (percentage >= .75) {
                icon = "fa fa-smile-o";
                message = 'Tingkatkan';
                chartcolor = "green";
            } else if (percentage >= .5) {
                icon = "fa fa-meh-o";
                message = 'Semoga lebih baik lain kali.';
                chartcolor = "orange";
            } else {
                icon = "fa fa-meh-o";
                message = 'Mungkin kamu harus mencoba lebih baik';
                chartcolor = "red";
            }
            $('.score-label h1').html('<small>Hi </small>' + username + ', ' + 'Skor Anda<i class="smiley"></i>');
            $('.message').text(message);
            $('.score-detail h3').text(scoremessage);
            $('.smiley').addClass(icon);
            $('#question-box').hide();
            $('#result').show();
            $('.percentage').easyPieChart({
                animate: 1000,
                lineWidth: 4,
                onStep: function(value) {
                    this.$el.find('span').text(Math.round(value));
                },
                onStop: function(value, to) {
                    this.$el.find('span').text(Math.round(to));
                },
                barColor: chartcolor
            });
            $('#prevButton, #nextButton, #submitButton').hide();
            $('.navigation-buttons #resultButton').show();
        });
        $('#resultButton').click(function() {
            changeColor();
            $('#result').hide();
            var table = $('#result-stats table').find('tbody');
            var tr;
            for (var i = 0; i < self.questions.length; i++) {
                tr = $('<tr>');
                if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
                    tr.append('<td><i class="fa fa-check-circle"></i>' + self.questions[i].question_string + '</td>');
                } else {
                    tr.append('<td><i class="fa fa-times-circle"></i>' + self.questions[i].question_string + '</td>');
                }
                if (self.questions[i].choices[self.questions[i].user_choice_index] !== undefined) {
                    tr.append('<td>' + self.questions[i].choices[self.questions[i].user_choice_index] + '</td>');
                } else {
                    tr.append('<td>' + '<span class="grey">No Attempt</span>' + '</td>');
                }
                tr.append('<td>' + self.questions[i].choices[self.questions[i].correct_choice_index] + '</td>');
                tr.appendTo(table);
            }
            $('#result-stats').show();
            $('#resultButton').hide()
        });
        // Add a listener on the questions container to listen for user select changes. This is for determining whether we can submit answers or not.
        question_container.bind('user-select-change', function() {
            var all_questions_answered = true;
            for (var i = 0; i < self.questions.length; i++) {
                if (self.questions[i].user_choice_index === null) {
                    all_questions_answered = false;
                    break;
                }
            }
            $('#submit-button').prop('disabled', !all_questions_answered);
        });
    }
    var Question = function(count, question_string, correct_choice, wrong_choices) {
            this.question_string = count + ". " + question_string;
            this.choices = [];
            this.user_choice_index = null; // Index of the user's choice selection

            // Random assign the correct choice an index
            this.correct_choice_index = Math.floor(Math.random() * wrong_choices.length + 1);
            var number_of_choices = wrong_choices.length + 1;
            for (var i = 0; i < number_of_choices; i++) {
                if (i === this.correct_choice_index)
                    this.choices[i] = correct_choice;
                else {
                    var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
                    this.choices[i] = wrong_choices[wrong_choice_index];

                    // Remove the wrong choice from the wrong choice array so that we don't pick it again
                    wrong_choices.splice(wrong_choice_index, 1);
                }
            }
        }
        // A function that you can enact on an instance of a question object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the question in. This question will "return" with the score when the question has been answered.
    Question.prototype.render = function(container) {
        // For when we're out of scope
        var self = this;

        // Fill out the question label
        var question_string_h2;
        if (container.children('h2').length === 0) {
            question_string_h2 = $('<h2>').appendTo(container);
        } else {
            question_string_h2 = container.children('h2').first();
        }
        question_string_h2.text(this.question_string);

        // Clear any radio buttons and create new ones
        if (container.children('label').length > 0) {
            container.children('label').each(function() {
                var radio_button_id = $(this).attr('id');
                $(this).remove();
                container.children('label[for=' + radio_button_id + ']').remove();
            });
        }

        for (var i = 0; i < this.choices.length; i++) {

            // Create the label
            var choice_label = $('<label>')
                .attr('for', 'choices-' + i)
                .appendTo(container);

            // Create the radio button
            var choice_radio_button = $('<input>')
                .attr('id', 'choices-' + i)
                .attr('type', 'radio')
                .attr('name', 'choices')
                .attr('value', 'choices-' + i)
                .attr('class', 'option-input radio')
                .attr('checked', i === this.user_choice_index)
                .appendTo(choice_label);

            choice_label.append(this.choices[i]);

        }
        // Add a listener for the radio button to change which one the user has clicked on
        $('input[name=choices]').change(function(index) {
            var selected_radio_button_value = $('input[name=choices]:checked').val();

            // Change the user choice index
            self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));

            // Trigger a user-select-change
            container.trigger('user-select-change');
        });
    }
    $(document).ready(function() {
        changeColor();
        $('#name-input-box').css('border-bottom', 'solid thin ' + myColor);
        var quiz = new Quiz('My Quiz');
        for (var i = 0; i < all_questions.length; i++) {
            var question = new Question((i + 1), all_questions[i].question_string, all_questions[i].choices.correct, all_questions[i].choices.wrong);

            // Add the question to the instance of the Quiz object that we created previously
            quiz.add_question(question);
        }
        // Render the quiz
        var quiz_container = $('#question-box');
        $('.navigation-buttons').hide();
        $('#result').hide();
        $('#result-stats').hide();
        $('#name-form').on('submit', function(event) {
            event.preventDefault();
            username = $('#name-input-box').val();
            if (username !== '' && username !== undefined) {
                $('.name-box').hide();
                quiz.render(quiz_container);
                $('.navigation-buttons').show();
                $('#resultButton').hide();
            }
        });
    });

})(jQuery);