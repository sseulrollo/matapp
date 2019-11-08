const SCROLL_TOP = 'TOP';
const SCROLL_DEFUALT = 'DEFAULT';

const initialState = {
    menuFixed: false
}

export const actionCreators = {
  fixMenu: () => async(dispatch, getState) => dispatch({ type: SCROLL_TOP }),
  unFixMenu: () => async(dispatch, getState) => dispatch({ type: SCROLL_DEFUALT })
}

export const reducer = (state, action) => {
    state = state || initialState;
    action = action || {type:SCROLL_DEFUALT};
    
    if (action.type === SCROLL_DEFUALT) {
        return {
            ...state,
            menuFixed: false
        }
    } else if (action.type === SCROLL_TOP){
        return {
            ...state,
            menuFixed: true
        }
    } else 
        return state;
}