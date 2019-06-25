import _ from 'lodash'
import users from './users'

function removeAcento (text)
{       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
}

export const contains = ({razaoSocial, especialidade}, query) => {
    var formatedEspecialidade = removeAcento(especialidade)
    var formatedQuery = removeAcento(query)
    console.log(formatedQuery)
    if (razaoSocial.includes(formatedQuery) || formatedEspecialidade.includes(formatedQuery)) {
        return true;
    }
    return false
};


export const getUsers = (limit = 20, query = '') => {
    console.log('api called', query)
    return new Promise((resolve, reject) => {
        if (query.length === 0) {   
            resolve(_.take(users, limit));
        } else {
            const formatedQuery = query.toLowerCase();
            const results = _.filter(users, user => {
                return contains(user, formatedQuery)
            })
            resolve(_.take(results, limit))
        }
        })
}

export default getUsers;