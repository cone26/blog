import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn({ nullable: false })
  createAt: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date
}
