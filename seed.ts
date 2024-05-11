import { LocalDateTime, convert } from "js-joda";
import { prisma } from "./prisma/prisma-client";

async function seed() {
  await prisma.$connect();
  const bulkSize = 1000000;

  await prisma.user.createMany({
    data: new Array(bulkSize).fill(0).map((_, index) => ({
      name: `User ${index + 1}`,
    })),
  });

  // 게시글과 댓글 100만개씩 생성
  for (let i = 0; i < bulkSize; i += 10000) {
    await prisma.post.createMany({
      data: new Array(10000).fill(0).map((_, index) => ({
        title: `Post for user ${i + index + 1}`,
        // createdAt과 updatedAt을 3년 전 날짜부터 현재까지 랜덤하게 생성
        createdAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        updatedAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        authorId: i + index + 1,
      })),
    });

    await prisma.comment.createMany({
      data: new Array(10000).fill(0).map((_, index) => ({
        createdAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        updatedAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        text: `Comment for post ${i + index + 1}`,
        userId: Math.floor(Math.random() * bulkSize) + 1,
        postId: i + index + 1,
      })),
    });
  }

  // 일반 신고 테이블 게시물, 댓글, 유저 100만개씩 생성
  for (let i = 0; i < bulkSize; i += 10000) {
    await prisma.report.createMany({
      data: new Array(10000).fill(0).map((_, index) => ({
        reason: `Reason for user ${i + index + 1}`,
        createdAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        updatedAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        userId: i + index + 1,
      })),
    });

    await prisma.report.createMany({
      data: new Array(10000).fill(0).map((_, index) => ({
        reason: `Reason for post ${i + index + 1}`,
        createdAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        updatedAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        postId: i + index + 1,
      })),
    });

    await prisma.report.createMany({
      data: new Array(10000).fill(0).map((_, index) => ({
        reason: `Reason for comment ${i + index + 1}`,
        createdAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        updatedAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        commentId: i + index + 1,
      })),
    });
  }

  // 타겟 ID로 신고 테이블 게시물, 댓글, 유저 100만개씩 생성
  for (let i = 0; i < bulkSize; i += 10000) {
    await prisma.reportWithTarget.createMany({
      data: new Array(10000).fill(0).map((_, index) => ({
        reason: `Reason for user ${i + index + 1}`,
        createdAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        updatedAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        targetKind: "USER",
        targetId: Math.floor(Math.random() * bulkSize) + 1,
      })),
    });

    await prisma.reportWithTarget.createMany({
      data: new Array(10000).fill(0).map((_, index) => ({
        reason: `Reason for post ${i + index + 1}`,
        createdAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        updatedAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        targetKind: "POST",
        targetId: Math.floor(Math.random() * bulkSize) + 1,
      })),
    });

    await prisma.reportWithTarget.createMany({
      data: new Array(10000).fill(0).map((_, index) => ({
        reason: `Reason for comment ${i + index + 1}`,
        createdAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        updatedAt: convert(
          LocalDateTime.now()
            .minusYears(3)
            .plusDays(Math.floor(Math.random() * 1095))
        ).toDate(),
        targetKind: "COMMENT",
        targetId: Math.floor(Math.random() * bulkSize) + 1,
      })),
    });
  }

  await prisma.$disconnect();
}

await seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
