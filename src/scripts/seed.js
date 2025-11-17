const { connectDatabase } = require('../config/database');
const NationalIdRecord = require('../models/NationalIdRecord');
const PassportRecord = require('../models/PassportRecord');
const BirthCertificateRecord = require('../models/BirthCertificateRecord');
const DeathRecord = require('../models/DeathRecord');
const AlienRegistrationRecord = require('../models/AlienRegistrationRecord');

async function seed() {
  await connectDatabase();

  await Promise.all([
    NationalIdRecord.deleteMany({}),
    PassportRecord.deleteMany({}),
    BirthCertificateRecord.deleteMany({}),
    DeathRecord.deleteMany({}),
    AlienRegistrationRecord.deleteMany({})
  ]);

  await NationalIdRecord.insertMany([
    {
      idNumber: '21234567',
      firstName: 'Mary',
      middleName: 'Njeri',
      surname: 'Kimani',
      gender: 'Female',
      dateOfBirth: new Date('1989-02-08'),
      citizenshipStatus: 'Citizen',
      issuanceDate: new Date('2007-06-21')
    },
    {
      idNumber: '18976543',
      firstName: 'Peter',
      middleName: 'Otieno',
      surname: 'Onyango',
      gender: 'Male',
      dateOfBirth: new Date('1984-11-02'),
      citizenshipStatus: 'Citizen',
      issuanceDate: new Date('2005-03-11')
    },
    {
      idNumber: '30567891',
      firstName: 'Faith',
      middleName: 'Achieng',
      surname: 'Oduor',
      gender: 'Female',
      dateOfBirth: new Date('1994-07-18'),
      citizenshipStatus: 'Citizen',
      issuanceDate: new Date('2013-09-05')
    },
    {
      idNumber: '16789023',
      firstName: 'Brian',
      middleName: 'Kiptoo',
      surname: 'Cheruiyot',
      gender: 'Male',
      dateOfBirth: new Date('1991-01-25'),
      citizenshipStatus: 'Citizen',
      issuanceDate: new Date('2010-02-14')
    }
  ]);

  await PassportRecord.insertMany([
    {
      passportNumber: 'CK012345',
      firstName: 'Mary',
      middleName: 'Njeri',
      surname: 'Kimani',
      nationality: 'Kenyan',
      dateOfBirth: new Date('1989-02-08'),
      issuedOn: new Date('2022-01-14'),
      expiresOn: new Date('2032-01-14')
    },
    {
      passportNumber: 'AK998877',
      firstName: 'Peter',
      middleName: 'Otieno',
      surname: 'Onyango',
      nationality: 'Kenyan',
      dateOfBirth: new Date('1984-11-02'),
      issuedOn: new Date('2020-09-03'),
      expiresOn: new Date('2030-09-03')
    },
    {
      passportNumber: 'BN556677',
      firstName: 'Faith',
      middleName: 'Achieng',
      surname: 'Oduor',
      nationality: 'Kenyan',
      dateOfBirth: new Date('1994-07-18'),
      issuedOn: new Date('2021-03-11'),
      expiresOn: new Date('2031-03-11')
    }
  ]);

  await BirthCertificateRecord.insertMany([
    {
      certificateNumber: 'BC-2017-015',
      firstName: 'Leah',
      middleName: 'Achieng',
      surname: 'Omondi',
      dateOfBirth: new Date('2017-06-17'),
      placeOfBirth: 'Nairobi Hospital',
      motherName: 'Amina Wanjiru Omondi',
      fatherName: 'Samuel Otieno Omondi'
    },
    {
      certificateNumber: 'BC-2014-102',
      firstName: 'Ian',
      middleName: 'Muthoni',
      surname: 'Mwangi',
      dateOfBirth: new Date('2014-02-01'),
      placeOfBirth: 'Kenyatta National Hospital',
      motherName: 'Grace Muthoni Mwangi',
      fatherName: 'Daniel Kariuki Mwangi'
    },
    {
      certificateNumber: 'BC-2019-062',
      firstName: 'Zuri',
      middleName: 'Wangari',
      surname: 'Mburu',
      dateOfBirth: new Date('2019-10-09'),
      placeOfBirth: 'Aga Khan University Hospital',
      motherName: 'Lucy Wanjiku Mburu',
      fatherName: 'James Kariuki Mburu'
    }
  ]);

  await DeathRecord.insertMany([
    {
      idNumber: '33445566',
      firstName: 'Margaret',
      middleName: 'Naliaka',
      surname: 'Odhiambo',
      dateOfDeath: new Date('2021-09-05'),
      deathRegistrationNumber: 'DRN-2021-778',
      placeOfDeath: 'Kisumu County Hospital'
    },
    {
      idNumber: '29887766',
      firstName: 'John',
      middleName: 'Mutuku',
      surname: 'Nzomo',
      dateOfDeath: new Date('2023-04-12'),
      deathRegistrationNumber: 'DRN-2023-112',
      placeOfDeath: 'Machakos Level 5 Hospital'
    }
  ]);

  await AlienRegistrationRecord.insertMany([
    {
      alienId: 'ALN-0007',
      firstName: 'Samuel',
      middleName: 'Kwame',
      surname: 'Mensah',
      nationality: 'Ghanaian',
      permitCategory: 'Work Permit - Class D',
      permitIssueDate: new Date('2022-11-05'),
      permitExpiryDate: new Date('2024-11-05')
    },
    {
      alienId: 'ALN-0010',
      firstName: 'Fatima',
      middleName: 'Raheem',
      surname: 'Abdallah',
      nationality: 'Tanzanian',
      permitCategory: 'Residence Permit - Class G',
      permitIssueDate: new Date('2020-07-18'),
      permitExpiryDate: new Date('2025-07-18')
    },
    {
      alienId: 'ALN-0025',
      firstName: 'Li',
      middleName: 'Hua',
      surname: 'Zhou',
      nationality: 'Chinese',
      permitCategory: 'Investor Permit - Class G',
      permitIssueDate: new Date('2021-02-03'),
      permitExpiryDate: new Date('2026-02-03')
    }
  ]);

  console.log('Sample records seeded successfully');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
