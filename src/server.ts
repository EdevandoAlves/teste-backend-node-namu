import "reflect-metadata"
import { app } from "./app"
import { AppDataSource } from "./database/data-source"


AppDataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT || 8000

    app.listen(PORT, () => {
      console.log(`Server running in port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })

