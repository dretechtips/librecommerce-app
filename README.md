# Librecommerce App[WIP]

A free and open source federated commerce platform build on NodeJS and the Matrix real-time communication Protocol.

## Why was this created?
It seems that a lot of people are coming to the concenus that near-monopolistic centralization of online services is not really a good idea. Many problems arises such as censorship whether fairly or unfairly could and has even threaten the livelihood of businesses and people. For e-commerce platform this includes anti-competitory behabiors from centralized marketplace and foreign businesses who don't play by the same rules as the participants of said centralized marketplace.

Solutions to this existing problems include self hosted e-commerce platforms. While these solutions do solve some of the problems above, they also introduce a whole bunch of problems such as obscurity, the requirement of some technical knowledge to deploy such solutions, and the lack of scalability.

There must be a middle ground between the centralized e-commerce indexers and the decentralized e-commerce stores. And a middle ground is exactly what librecommerce is. Anybody can setup a librecommerce marketplace instance and aggregates librecommerce store instances to build up a successful marketplace. The difference between librecommerce market place and current centralized marketplace is that the librecommerce marketplace and stores have equal bargaining power. If the the majority of stores within the marketplace demand protectionism then the marketplace would comply otherwise the stores can create their own marketplace or join an existing marketplace if they determine that the cost of not having protectionism outweighs the cost of being in the original marketplace. Marketplaces also gains from this as well because they can position themselves with certain popular consumer and producer market trait in order to bolster their own marketing. In theory, the stores will aggreate in a way that is driven by the consumers and producers market force and not the marketplace. The marketplace will also not have competitory advantages because all data is not centralized and ends up encrypted until reaching the client. While, it is true that the marketplace can build a crawler to track competitor behaviors, they are incentivized not to because upon discovery the stores can easily create a new marketplace where this behavior doesn't occur. And thus this should create a fair and stable playing field for all the participants.

A lot of small business owners don't have the resource or technical expertise to setup a server so they can sign up with a store broker and can transfer to a self-hosted solution once they've established themselves. The issue of scalability would be solved through the use of shared compute resource. A marketplace with an unsatisfactory user experience through insufficient compute resource will be at a disadvantage compared to a marketplace that shares compuete resource between the stores to ensure a unified experience. If a marketplace feels that the store is taking too much resource then the marketplace can demand that the store contributes more resource or face punishment depending on the terms of service. Thus businesses are allowed to scale as needed but are incentivized to contribute compuete resources as well to help the marketplace overall.

## Goals
* A decentralized e-commerce platform that can be indexed through multiple tree like hierarchial indexer.
* Fair and equal marketplace.
* Node managers and node participants will have equal negotiating power for terms of use and fees.
* Extensibility through plugin support.
* Synchronize with existing marketplace.
* [Opt-In] Encrypted service and database distribution for scaling.


## Interesting Use Case
* Virtual Marketplace/Store

## Components
[Librecommerce UI](https://github.com/saandre15/librecommerce-ui)

[Librecommerce UI Core](https://github.com/saandre15/librecommerce-ui-core)

[Librecommerce Server](https://github.com/saandre15/librecommerce-server)

[Librecommerce Bridge](https://github.com/saandre15/librecommerce-bridge)

## Install

```
./scripts/install.sh
```

## Uninstall

```
./scripts/uninstall.sh
```
