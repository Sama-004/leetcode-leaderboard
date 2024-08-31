import axios from 'axios';
import prisma from '../db/db';

export async function fetchUserStats(username: string, userId: string) {
  try {
    const contestResponse = await axios.post('https://leetcode.com/graphql', {
      query: `
        query userContestRankingInfo($username: String!) {
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
          }
        }
      `,
      variables: { username },
    });

    const { attendedContestsCount, rating, globalRanking } =
      contestResponse.data.data.userContestRanking;

    const progressResponse = await axios.post('https://leetcode.com/graphql', {
      query: `
        query userProfileUserQuestionProgressV2($userSlug: String!) { 
          userProfileUserQuestionProgressV2(userSlug: $userSlug) { 
            numAcceptedQuestions { 
              count 
              difficulty 
            } 
          } 
        }
      `,
      variables: { userSlug: username },
    });

    const questionProgress =
      progressResponse.data.data.userProfileUserQuestionProgressV2
        .numAcceptedQuestions;

    // TODO: Change type here
    const easyQuestionsSolved =
      questionProgress.find((q: any) => q.difficulty === 'EASY')?.count || 0;
    const mediumQuestionsSolved =
      questionProgress.find((q: any) => q.difficulty === 'MEDIUM')?.count || 0;
    const hardQuestionsSolved =
      questionProgress.find((q: any) => q.difficulty === 'HARD')?.count || 0;

    await prisma.userStats.upsert({
      where: { userId: userId },
      update: {
        easyQuestionsSolved,
        mediumQuestionsSolved,
        hardQuestionsSolved,
        contestRating: Math.round(rating),
        globalRanking,
        attendedContests: attendedContestsCount,
        lastUpdated: new Date(),
      },
      create: {
        userId: userId,
        easyQuestionsSolved,
        mediumQuestionsSolved,
        hardQuestionsSolved,
        contestRating: Math.round(rating),
        globalRanking,
        attendedContests: attendedContestsCount,
      },
    });

    console.log(`Stats updated for user ${username}`);
  } catch (error) {
    console.error(`Error fetching stats for user ${username}:`, error);
  }
}
