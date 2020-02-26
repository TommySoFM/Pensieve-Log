const state = {
  deleteModalSwitch: false,
  editModalSwitch: false,
  modalId: 0,
  modalMode:''
};

const getters = {
  getDeleteModalSwitch: state => {
    return state.deleteModalSwitch;
  },
  getEditModalSwitch: state => {
    return state.editModalSwitch;
  },
  getModalId: state => {
    return state.modalId;
  }
};

const mutations = {
  modalOn: state => {
    if(state.modalMode === 'delete'){
      state.deleteModalSwitch = true;
    }else if(state.modalMode === 'edit'){
      state.editModalSwitch = true;
    }
  },
  modalOff: state => {
    state.deleteModalSwitch = false;
    state.editModalSwitch = false;
  },
  setModal: (state,payload) => {
    state.modalId = payload.id;
    state.modalMode = payload.mode;
  }
};

const actions = {
  modalOn: ({commit}) => {
    commit('modalOn');
  },
  modalOff: ({commit}) => {
    commit('modalOff');
  },
  setModal: ({commit}, payload) => {
    commit('setModal',payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
