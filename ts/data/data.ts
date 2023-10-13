import { FavoriteComment } from "../enum/favorite.js";
import { RatingType } from "../enum/rating.js";
import { Comment } from "../others/Config.js";
import User from "../others/User.js";

export const startComments: Comment[] = [
	{
		id: '74ace003-042b-4fbc-a6d4-5dc2db2599d6',
		parentId: null,
		answerIds: [],
		lastAnswer: new Date('2023-08-28T10:01:38+03:00'),
		userPhoto: `${User._userPhoto}`,
		userName: `Nata`,
		dataComment: new Date('2023-08-28T10:01:38+03:00'),
		isFavorite: FavoriteComment.In,
		noParentForFavorite: false,
		rating: {
			currentRating: 2,
			votes: [{
				userId: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
				type: RatingType.Like,
			},{
				userId: 'ce4bfff8-08e6-4e3a-9cc0-ac8ae75ee424',
				type: RatingType.Like,
			}]
		},
		textComment: `Lorem ipsum was conceived as filler text, formatted in a certain way to enable the presentation of graphic elements in documents, without the need for formal copy. Using Lorem Ipsum allows designers to put together layouts and the form of the content before the content has been created, giving the design and production process more freedom.`
	},
	{
		id: 'ce4bfff8-08e6-4e3a-9cc0-ac8ae75ee424',
		parentId: null,
		answerIds: [],
		lastAnswer: new Date('2023-08-21T18:40:24+03:00'),
		userPhoto: 'assets/images/user_1.png',
		userName: 'Max',
		dataComment: new Date('2023-08-21T18:40:24+03:00'),
		isFavorite: FavoriteComment.Out,
		noParentForFavorite: false,
		rating: {
			currentRating: 0,
			votes: []
		},
		textComment: `qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem`,
	},
	{
		id: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
		parentId: null,
		answerIds: ['f75f9eec-169e-49d1-a7bc-8dafd46a193f', '7c6bfb11-51cd-4763-9795-786d18d65395', '7c6bfb11-51cd-4763-9795-786d18d65396'],
		lastAnswer: new Date('2023-08-19T09:11:04+03:00'),
		userPhoto: 'assets/images/user_2.png',
		userName: 'Nike_1994b',
		dataComment: new Date('2023-08-18T13:55:40+03:00'),
		isFavorite: FavoriteComment.In,
		noParentForFavorite: false,
		rating: {
			currentRating: 5,
			votes: [{
					userId: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
					type: RatingType.Like,
				},{
					userId: 'ce4bfff8-08e6-4e3a-9cc0-ac8ae75ee424',
					type: RatingType.Like,
				},{
					userId: 'f75f9eec-169e-49d1-a7bc-8dafd46a193f',
					type: RatingType.Like,
				},{
					userId: '135f42f7-c467-42bd-863f-d00836ce156c',
					type: RatingType.Like,
				},{
					userId: '7c6bfb11-51cd-4763-9795-786d18d65395',
					type: RatingType.Like,
				},
			]
		},
		textComment: `Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure`,
	},
	{
		id: 'f75f9eec-169e-49d1-a7bc-8dafd46a193f',
		parentId: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
		answerIds: [],
		lastAnswer: new Date('2023-08-18T15:18:47+03:00'),
		userPhoto: 'assets/images/user_3.png',
		userName: 'JunBox3000',
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
		textComment: `Lorem ipsum dolor sit amet consectetur adipiscing elit aenean pulvinar, et vulputate augue nascetur sodales ligula lacinia congue etiam, facilisis aptent sagittis volutpat torquent mi inceptos velit. Et nisl congue ad felis placerat convallis platea fames augue, eleifend taciti risus netus inceptos etiam lobortis habitasse nulla, lacinia cras rhoncus sed magna ante hendrerit montes.`,
	},
	{
		id: '7c6bfb11-51cd-4763-9795-786d18d65395',
		parentId: 'f02ece3c-7a61-4475-a834-98d65ecf1b42',
		answerIds: [],
		lastAnswer: new Date('2023-08-19T09:11:04+03:00'),
		userPhoto: 'assets/images/user_4.png',
		userName: 'Mr_Sock',
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
		textComment: `Lorem ipsum.`,
	}
]
