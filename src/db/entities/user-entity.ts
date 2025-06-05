import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: '200' })
  name: string;
  @Column({ type: 'varchar', length: '100' })
  email: string;
  @Column({ type: 'varchar', length: '100' })
  password: string;
  @Column({ type: 'varchar', length: '10' })
  mobile: string;
  @Column({ type: 'varchar', length: '10' })
  gender: string;
  @Column({ type: 'timestamp' })
  date_of_birth: Date;
}
