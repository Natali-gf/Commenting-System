import { FavoriteComment } from "../enum/favorite.js";
import { RatingType } from "../enum/rating.js";
import { Comment } from "../others/Config.js";

export const startComments: Comment[] = [
	{
		id: 'ce4bfff8-08e6-4e3a-9cc0-ac8ae75ee424',
		parentId: null,
		answerIds: [],
		lastAnswer: new Date('2023-08-21T18:40:24+03:00'),
		userPhoto: 'assets/images/user_1.png',
		userName: 'Максим Авдеенко',
		dataComment: new Date('2023-08-21T18:40:24+03:00'),
		isFavorite: FavoriteComment.Out,
		noParentForFavorite: false,
		rating: {
			currentRating: 0,
			votes: []
		},
		textComment: `Называть проект Молочникова, в котором играют прекрасные Янковский и Эйдельштейн, 'сериалом с блогерами' - это реально несправедливо. К тому же, у Молочникова уже играла в спектакле Екатерина Варнава, которая тоже не актриса, и получилось отлично. Так что, вполне возможно, и Ивлеева с хорошим режиссером себя еще покажет Варнава, которая тоже не актриса, и получилось отлично. Так что, вполне возможно, и Ивлеева с хорошим режиссером себя еще покажет.`,
	},
	{
		id: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
		parentId: null,
		answerIds: ['f75f9eec-169e-49d1-a7bc-8dafd46a193f', '7c6bfb11-51cd-4763-9795-786d18d65395', '7c6bfb11-51cd-4763-9795-786d18d65396'],
		lastAnswer: new Date('2023-08-19T09:11:04+03:00'),
		userPhoto: 'assets/images/user_2.png',
		userName: 'Алексей_1994b',
		dataComment: new Date('2023-08-18T13:55:40+03:00'),
		isFavorite: FavoriteComment.In,
		noParentForFavorite: false,
		rating: {
			currentRating: 5,
			votes: [{
					userId: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
					type: RatingType.Dislike,
				},{
					userId: 'ce4bfff8-08e6-4e3a-9cc0-ac8ae75ee424',
					type: RatingType.Dislike,
				},{
					userId: 'f75f9eec-169e-49d1-a7bc-8dafd46a193f',
					type: RatingType.Dislike,
				},{
					userId: '135f42f7-c467-42bd-863f-d00836ce156c',
					type: RatingType.Dislike,
				},{
					userId: '7c6bfb11-51cd-4763-9795-786d18d65395',
					type: RatingType.Dislike,
				},
			]
		},
		textComment: `Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.`,
	},
	{
		id: 'f75f9eec-169e-49d1-a7bc-8dafd46a193f',
		parentId: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
		answerIds: [],
		lastAnswer: new Date('2023-08-18T15:18:47+03:00'),
		userPhoto: 'assets/images/user_3.png',
		userName: 'Джунбокс3000',
		dataComment: new Date('2023-08-18T15:18:47+03:00'),
		isFavorite: FavoriteComment.Out,
		noParentForFavorite: false,
		rating: {
			currentRating: 3,
			votes: [
				{
					userId: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
					type: RatingType.Like,
				},
				{
					userId: 'ce4bfff8-08e6-4e3a-9cc0-ac8ae75ee424',
					type: RatingType.Like,
				},
				{
					userId: '7c6bfb11-51cd-4763-9795-786d18d65395',
					type: RatingType.Like,
				},
			]
		},
		textComment: `Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.`,
	},
	{
		id: '7c6bfb11-51cd-4763-9795-786d18d65395',
		parentId: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
		answerIds: [],
		lastAnswer: new Date('2023-08-19T09:11:04+03:00'),
		userPhoto: 'assets/images/user_4.png',
		userName: 'Мистер_душнила',
		dataComment: new Date('2023-08-19T09:11:04+03:00'),
		isFavorite: FavoriteComment.Out,
		noParentForFavorite: false,
		rating: {
			currentRating: -5,
			votes: [
				{
					userId: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
					type: RatingType.Dislike,
				},
				{
					userId: 'ce4bfff8-08e6-4e3a-9cc0-ac8ae75ee424',
					type: RatingType.Dislike,
				},
				{
					userId: 'f75f9eec-169e-49d1-a7bc-8dafd46a193f',
					type: RatingType.Dislike,
				},
				{
					userId: '135f42f7-c467-42bd-863f-d00836ce156c',
					type: RatingType.Dislike,
				},
				{
					userId: '7c6bfb11-51cd-4763-9795-786d18d65395',
					type: RatingType.Dislike,
				},
			]
		},
		textComment: `Какую-то дичь несешь, братиш!`,
	}
]

// export const users: User[] = [

// ]