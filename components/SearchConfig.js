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

export const contains = ({razaoSocial, bairro, cidade}, query) => {
    var formatedRazaoSocial = removeAcento(razaoSocial)
    var formatedCidade = removeAcento(cidade)
    var formatedBairro = removeAcento(bairro)
    var formatedQuery = removeAcento(query)
    if (formatedRazaoSocial.includes(formatedQuery) || formatedBairro.includes(formatedQuery) || formatedCidade.includes(formatedQuery)) {
        return true;
    }
    return false
};


export const getUsers = (limit = 20, query = '', data = null) => {
    return new Promise((resolve, reject) => {
        if (query.length === 0) {   
            resolve(_.take(data, limit));
        } else {
            const formatedQuery = query.toLowerCase();
            const results = _.filter(data, user => {
            return contains(user, formatedQuery)
            })
            resolve(_.take(results, limit))
        }
        })
}

export default getUsers;