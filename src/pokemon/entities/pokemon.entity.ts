import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Entity es la representación de lo que nosotros vamos a estar grabando en la base de datos.

@Schema()
export class Pokemon extends Document {
  // id: string // Mongo lo entrega por defecto
  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ unique: true, index: true })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
