import { faker } from "@faker-js/faker";

interface TweetsType{
    userImage: string,
    userName: string,
    atSign: string,
    content: string,
    likes: number,
    comentarys: number,
    retweets: number,
    answerTo: string | null,
    id: string
}

const tweets: TweetsType[] = []; 

for(let i = 0; i < 30; i++) {
    let answerTo = null;
    if(Math.random() < 0.6 && i > 0){
        const index = Math.floor(Math.random()*(tweets.length-1)+0);
        answerTo = tweets[index]?.id;
    }
    const completeName = faker.person.fullName();
    tweets.push({
        userImage: faker.image.avatar(),
        userName: completeName,
        atSign: "@"+completeName.replace(/[\s]/gui, "_"),
        content: faker.lorem.text(),
        likes: faker.number.int({min: 0, max: 400}),
        comentarys: faker.number.int({min: 0, max: 200}),
        retweets: faker.number.int({min: 0, max: 100}),
        answerTo: answerTo,
        id: newId()
    })
};

function newId(){
    return faker.string.uuid()
}

export {tweets, newId}