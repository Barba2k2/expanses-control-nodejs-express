import { TransactionNotFoundError } from "./errors/transaction-not-found.error.js";
import { TransactionUidNotInformedError } from "./errors/transaction-uid-not-informed.error.js";
import { UserNotInformedError } from "./errors/user-not-informed.error.js";
import { TransactionRepository } from "./repository.js";

export class Transaction {

    date;
    description;
    money;
    transactionType;
    type;
    user;

    #repository;

    constructor(transactionRepository){
        this.#repository = transactionRepository || new TransactionRepository();
    }

    findByUser() {
        if(!this.user?.uid){
            return Promise.reject(new UserNotInformedError());
        }

        return this.#repository.findUserByUid(this.user.uid);
    }

    findByUid() {
        if(!this.uid){
            return Promise.reject(new TransactionUidNotInformedError());
        }
        return this.#repository.findByUid(this.uid).then(transactionDb => {
            if(!transactionDb){
                return Promise.reject(new TransactionNotFoundError());
            }
            this.date = transactionDb.date;
            this.description = transactionDb.description;
            this.money = transactionDb.money;
            this.transactionType = transactionDb.transactionType;
            this.type = transactionDb.type;
            this.user = transactionDb.user;
        });
    }
}