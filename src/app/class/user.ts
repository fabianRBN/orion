import { Contact } from './contact';


export class User {
    id: number;
    name: string ;
    description: string ;
    source: number;
    level: number;
    active: boolean;
    external: boolean;
    contact: Contact;
    resources:string[];
}
