import Home from './components/Home/Home.vue'
import Questions from './components/Questions/Questions.vue'
import Tags from './components/Tags/Tags.vue'
import HomeInfo from './components/rightinfo/HomeInfo.vue'
import QuestionsInfo from './components/rightinfo/QuestionsInfo.vue'
import AskForm from './components/Ask/AskForm'
import Question from './components/Questions/Question.vue'
// import TagsInfo from './components/rightinfo/TagsInfo.vue'

export const routes = [
    {   path:'/home',
        components:{
            default:Home,
            'info-section':HomeInfo
            }
    },
    {   path:'/questions', 
        components:{
            default:Questions,
            'info-section':QuestionsInfo
        }
    },
    {   path:'/question/:id', 
        components:{
            default:Question,
            'info-section':QuestionsInfo
        }
    },
    {
        path:'/tags',
        components:{
            // default:Tags,
            'tags-view':Tags
        }        
    },
    {
        path:'/tags/:id',
        components:{
            default:Questions,
            // 'tags-view':Tags
        }        
    },
    {
        path:'/ask',
        components:{
            'ask-view':AskForm
        }        
    }
]