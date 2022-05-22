export default {

    namespaced: true,
    state() {

        return {
            loggedUser: JSON.parse(localStorage.getItem('loggedUser')) || null,
            isAuthenticated: localStorage.getItem('isAuthenticated') || false
        }
    },
    mutations: {
        LOGIN_USER(state, payload){

            state.loggedUser = payload;
            state.isAuthenticated = true;
        },

        LOGOUT_USER(state){
            state.loggedUser = null;
            state.isAuthenticated = false;
        }
    },

    getters: {
        isAuthenticated(state){
            return state.isAuthenticated;
        }
    },

    actions: {
        async loginUser(context, payload) {

            let verifiedUser = null;

            //Simulate user validation without backend (only for demo purposes)
            let users = await (await fetch("./fakeDatabase/users.json")).json();

            users.forEach((user) => {
                if(user.username === payload.username && user.password === payload.password){
                    verifiedUser = user;
                }
            });

            if(verifiedUser){

                delete verifiedUser["password"];

                context.commit( "LOGIN_USER", verifiedUser);

                localStorage.setItem("loggedUser", JSON.stringify(verifiedUser));
                localStorage.setItem("isAuthenticated", true);
            }else{
                const error = new Error("Wrong login credentials")
                error.code = 401
                throw error;
            }
        },

        async logoutUser(context){
            context.commit("LOGOUT_USER");

            localStorage.removeItem("loggedUser");
            localStorage.removeItem("isAuthenticated");
        }
    }
}
