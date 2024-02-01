import prisma from '../lib/prisma'

async function main() {
  const response = await Promise.all([
    await prisma.task.create({
      data: {
        text: "Construire une appli next js",
        checked: 0
      }
    }),
    await prisma.task.create({
      data: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        checked: 1
      }
    }),
    await prisma.task.create({
      data: {
        text: "TEST TEST TEST",
        checked: 1
      }
    })
  ])
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
