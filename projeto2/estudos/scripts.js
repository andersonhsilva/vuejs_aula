members = [
    {
        fname: 'John',
        lname: 'Lennon',
        instrument: 'Violão'
    },
    {
        fname: 'George',
        lname: 'Harrison',
        instrument: 'Guitarra'
    }
]

const handlingForms = {

    data() {
        return {
            members: window.members,
            newMember: {},
            messageForm: ''
        }
    },
    methods: {
        addMember: function () {
            if (this.newMember.fname && this.newMember.lname && this.newMember.instrument) {
                this.members.push(this.newMember);
                this.newMember = {};
                this.messageForm = '';
            } else {
                this.messageForm = 'Preencha todos os campos';
                setTimeout(() => { this.messageForm = ''; }, 3000);
            }
        }
    }

};

Vue.createApp(handlingForms).mount('#app');
