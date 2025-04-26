import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Comic from '#models/comic'
import { DateTime } from 'luxon'

export default class ComicSeeder extends BaseSeeder {
  async run() {
    // Hapus data existing jika ada (optional)
    await Comic.truncate()

    // Data komik yang akan di-seed
    const comicsData = [
      {
        title: 'One Piece',
        author: 'Eiichiro Oda',
        year: 1997,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      },
      {
        title: 'Attack on Titan',
        author: 'Hajime Isayama',
        year: 2009,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      },
      {
        title: 'Demon Slayer',
        author: 'Koyoharu Gotouge',
        year: 2016,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      }
    ]

    // Insert data ke database
    await Comic.createMany(comicsData)

    console.log('Seeder komik berhasil dijalankan!')
  }
}