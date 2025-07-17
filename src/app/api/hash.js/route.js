const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

// inscription
router.post("/", async (req, res) => {
  const saltRounds = 10;

  const { firstname: newFirstname, password: newPassword } = req.body;
  bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
    console.log("debug hash : ", hash);
    // Store hash in your password DB.
    const firstname = await prisma.users.create({
      data: {
        firstname: newFirstname,
        hash_password: hash,
      },
    });
  });
  res.sendStatus(200);
});

// login (on va chercher l'user par son ID dans la DB)
router.post("/login", async (req, res) => {
  const { id, password } = req.body;

  const usersUnique = await prisma.volunteers.findUnique({
    where: { id: id },
  });
  bcrypt.compare(
    password,
    usersUnique.hash_password,
    async function (err, result) {
      console.log("result: ", result);
    }
  );
  res.sendStatus(200);
});
