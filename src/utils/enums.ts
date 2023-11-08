export const enums = {
    currency: [
      {
        value: "HKD",
        trans: {
          "zh-CN": "HKD",
          tc: "HKD",
          en: "HKD",
        },
      },
      {
        value: "USD",
        trans: {
          "zh-CN": "USD",
          tc: "USD",
          en: "USD",
        },
      },
      {
        value: "CNY",
        trans: {
          "zh-CN": "CNY",
          tc: "CNY",
          en: "CNY",
        },
      },
    ],
    "market": {
        "market": [
            {
                "value": 'HKEX',
                "trans": {
                    "zh-CN": "港股",
                    "tc": "港股",
                    "en": "HKEX"
                }
            },
            {
                "value": 'US',
                "trans": {
                    "zh-CN": "美股",
                    "tc": "美股",
                    "en": "US"
                }
            },
            {
                "value": 'SSE',
                "trans": {
                    "zh-CN": "沪股",
                    "tc": "滬股",
                    "en": "SSE"
                }
            },
            {
                "value": 'SZSE',
                "trans": {
                    "zh-CN": "深股",
                    "tc": "深股",
                    "en": "SZSE"
                }
            }
        ],
        "market_type": [
            {
                "value": 'HK',
                "trans": {
                    "zh-CN": "港股",
                    "tc": "港股",
                    "en": "HK"
                }
            },
            {
                "value": 'US',
                "trans": {
                    "zh-CN": "美股",
                    "tc": "美股",
                    "en": "US"
                }
            },
            {
                "value": 'CN',
                "trans": {
                    "zh-CN": "A股",
                    "tc": "A股",
                    "en": "CN"
                }
            }
        ],
        "security_type": [
            {
                "value": "1",
                "trans": {
                    "zh-CN": "股票",
                    "tc": "股票",
                    "en": "Stock"
                }
            },
            {
                "value": "2",
                "trans": {
                    "zh-CN": "指数",
                    "tc": "指數",
                    "en": "Index"
                }
            },
            {
                "value": "3",
                "trans": {
                    "zh-CN": "其他",
                    "tc": "其他",
                    "en": "Other"
                }
            },
            {
                "value": "4",
                "trans": {
                    "zh-CN": "股指",
                    "tc": "股指",
                    "en": "Stock Index"
                }
            },
            {
                "value": "5",
                "trans": {
                    "zh-CN": "私募基金",
                    "tc": "私募基金",
                    "en": "Private Equity Fund"
                }
            },
            {
                "value": "6",
                "trans": {
                    "zh-CN": "公募基金",
                    "tc": "公募基金",
                    "en": "Public Mutual Fund"
                }
            },
            {
                "value": "11",
                "trans": {
                    "zh-CN": "窝轮",
                    "tc": "窩輪",
                    "en": "Warrant"
                }
            },
            {
                "value": "12",
                "trans": {
                    "zh-CN": "牛熊证",
                    "tc": "牛熊證",
                    "en": "Bull/Bear Certificate"
                }
            },
            {
                "value": "13",
                "trans": {
                    "zh-CN": "界内证",
                    "tc": "界內證",
                    "en": "Inline Warrant"
                }
            },
            {
                "value": "14",
                "trans": {
                    "zh-CN": "信托",
                    "tc": "信託",
                    "en": "Trust"
                }
            },
            {
                "value": "15",
                "trans": {
                    "zh-CN": "债券",
                    "tc": "債券",
                    "en": "Bond"
                }
            },
            {
                "value": "16",
                "trans": {
                    "zh-CN": "一篮子认沽权证",
                    "tc": "一籃子認沽權證",
                    "en": "Basket Put Warrant"
                }
            },
            {
                "value": "21",
                "trans": {
                    "zh-CN": "科创板",
                    "tc": "科創板",
                    "en": "STAR Market"
                }
            },
            {
                "value": "31",
                "trans": {
                    "zh-CN": "创业板",
                    "tc": "創業板",
                    "en": "ChiNext Board"
                }
            },
            {
                "value": "41",
                "trans": {
                    "zh-CN": "ETF",
                    "tc": "ETF",
                    "en": "Exchange-Traded Fund"
                }
            }
        ],
        "order":{
            "direction": [
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "买入",
                    "tc": "買入",
                    "en": "Buy"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "卖出",
                    "tc": "賣出",
                    "en": "Sell"
                  }
                }
              ],
            "price_type": [
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "限价单",
                    "tc": "限價單",
                    "en": "Limit Order"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "市价单",
                    "tc": "市價單",
                    "en": "Market Order"
                  }
                },
                {
                  "value": 3,
                  "trans": {
                    "zh-CN": "增强限价单",
                    "tc": "增強限價單",
                    "en": "Enhanced Limit Order"
                  }
                },
                {
                  "value": 4,
                  "trans": {
                    "zh-CN": "特别限价单",
                    "tc": "特別限價單",
                    "en": "Special Limit Order"
                  }
                },
                {
                  "value": 5,
                  "trans": {
                    "zh-CN": "竞价单",
                    "tc": "競價單",
                    "en": "Bid Order"
                  }
                },
                {
                  "value": 6,
                  "trans": {
                    "zh-CN": "竞价限价单",
                    "tc": "競價限價單",
                    "en": "Bid Limit Order"
                  }
                },
                {
                  "value": 7,
                  "trans": {
                    "zh-CN": "碎股单",
                    "tc": "碎股單",
                    "en": "Odd Lot Order"
                  }
                }
              ],
            "status": [
                {
                  "value": 0,
                  "trans": {
                    "zh-CN": "委托中",
                    "tc": "委託中",
                    "en": "Pending"
                  }
                },
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "委托成功",
                    "tc": "委託成功",
                    "en": "Successful"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "委托失败",
                    "tc": "委託失敗",
                    "en": "Failed"
                  }
                },
                {
                  "value": 3,
                  "trans": {
                    "zh-CN": "撤单中",
                    "tc": "撤單中",
                    "en": "Cancellation in Progress"
                  }
                },
                {
                  "value": 4,
                  "trans": {
                    "zh-CN": "撤单成功",
                    "tc": "撤單成功",
                    "en": "Cancellation Successful"
                  }
                },
                {
                  "value": 5,
                  "trans": {
                    "zh-CN": "部分成交",
                    "tc": "部分成交",
                    "en": "Partial Fill"
                  }
                },
                {
                  "value": 6,
                  "trans": {
                    "zh-CN": "交易完成",
                    "tc": "交易完成",
                    "en": "Trade Completed"
                  }
                },
                {
                  "value": 7,
                  "trans": {
                    "zh-CN": "交易失败",
                    "tc": "交易失敗",
                    "en": "Trade Failed"
                  }
                },
                {
                  "value": 8,
                  "trans": {
                    "zh-CN": "订单过期",
                    "tc": "訂單過期",
                    "en": "Order Expired"
                  }
                },
                {
                  "value": 10,
                  "trans": {
                    "zh-CN": "部成部撤",
                    "tc": "部成部撤",
                    "en": "Partial Fill and Cancel"
                  }
                }
              ],
            "brokenStockStatus": [
                {
                  "value": 4,
                  "trans": {
                    "zh-CN": "撤单成功",
                    "tc": "撤單成功",
                    "en": "Order Cancelled"
                  }
                },
                {
                  "value": 6,
                  "trans": {
                    "zh-CN": "交易完成",
                    "tc": "交易完成",
                    "en": "Trade Completed"
                  }
                },
                {
                  "value": 7,
                  "trans": {
                    "zh-CN": "交易失败",
                    "tc": "交易失敗",
                    "en": "Trade Failed"
                  }
                },
                {
                  "value": 8,
                  "trans": {
                    "zh-CN": "订单过期",
                    "tc": "訂單過期",
                    "en": "Order Expired"
                  }
                },
                {
                  "value": 10,
                  "trans": {
                    "zh-CN": "部成部撤",
                    "tc": "部分成交部分撤銷",
                    "en": "Partial Fill and Cancel"
                  }
                }
              ],
            "trade_type": [
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "做多",
                    "tc": "做多",
                    "en": "Long"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "做空",
                    "tc": "做空",
                    "en": "Short"
                  }
                }
              ],
            "counter_channel_scene":[
                {
                    "value": "QFII",
                    "trans": {
                        "zh-CN": "QFII",
                        "tc": "QFII",
                        "en": "QFII"
                    }
                }, {
                    "value": "ChinaConnect",
                    "trans": {
                        "zh-CN": "A股",
                        "tc": "A股",
                        "en": "CN"
                    }
                }, {
                    "value": "TRS",
                    "trans": {
                        "zh-CN": "TRS",
                        "tc": "TRS",
                        "en": "TRS"
                    }
                }
            ],
            "expire_type": [
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "当日有效",
                    "tc": "當日有效",
                    "en": "Day Order"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "撤销前有效",
                    "tc": "撤銷前有效",
                    "en": "Good Till Cancelled"
                  }
                },
                {
                  "value": 3,
                  "trans": {
                    "zh-CN": "指定时间有效",
                    "tc": "指定時間有效",
                    "en": "Good Till Time"
                  }
                },
                {
                  "value": 4,
                  "trans": {
                    "zh-CN": "全部成交否则取消",
                    "tc": "全部成交否則取消",
                    "en": "Fill or Kill"
                  }
                },
                {
                  "value": 5,
                  "trans": {
                    "zh-CN": "立即成交否则取消",
                    "tc": "立即成交否則取消",
                    "en": "Immediate or Cancel"
                  }
                }
              ],
            "create_type": [
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "客户交易",
                    "tc": "客戶交易",
                    "en": "Customer Transaction"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "后台订单",
                    "tc": "後台訂單",
                    "en": "Back-end Order"
                  }
                },
                {
                  "value": 3,
                  "trans": {
                    "zh-CN": "系统订单",
                    "tc": "系統訂單",
                    "en": "System Order"
                  }
                }
              ],
            "calculate_type": [
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "以金额计算",
                    "tc": "以金額計算",
                    "en": "Calculate by Amount"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "以数量计算",
                    "tc": "以數量計算",
                    "en": "Calculate by Quantity"
                  }
                },
                {
                  "value": 3,
                  "trans": {
                    "zh-CN": "每笔固定",
                    "tc": "每筆固定",
                    "en": "Fixed per Transaction"
                  }
                }
              ]
        },
        "poolMarket": [
            {
              "value": "",
              "trans": {
                "zh-CN": "全部",
                "tc": "全部",
                "en": "All"
              }
            },
            {
              "value": "SSE",
              "trans": {
                "zh-CN": "沪市",
                "tc": "滬市",
                "en": "SSE"
              }
            },
            {
              "value": "SZSE",
              "trans": {
                "zh-CN": "深市",
                "tc": "深市",
                "en": "SZSE"
              }
            }
          ]
    },
    "otc": {
        "account": {
            "status": [
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "启用",
                    "tc": "啟用",
                    "en": "Enabled"
                  }
                },
                {
                  "value": 0,
                  "trans": {
                    "zh-CN": "禁用",
                    "tc": "禁用",
                    "en": "Disabled"
                  }
                }
              ],
              "pi_status": [
                {
                  "value": 0,
                  "trans": {
                    "zh-CN": "未认证",
                    "tc": "未認證",
                    "en": "Not Authenticated"
                  }
                },
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "已认证",
                    "tc": "已認證",
                    "en": "Authenticated"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "已过期",
                    "tc": "已過期",
                    "en": "Expired"
                  }
                }
              ],
              "risk_assessment_status": [
                {
                  "value": 0,
                  "trans": {
                    "zh-CN": "未测评",
                    "tc": "未測評",
                    "en": "Not Evaluated"
                  }
                },
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "已测评",
                    "tc": "已測評",
                    "en": "Evaluated"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "已过期",
                    "tc": "已過期",
                    "en": "Expired"
                  }
                }
              ],
              "type": [
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "资金账户出金",
                    "tc": "資金賬戶出金",
                    "en": "Fund Withdrawal"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "资金账户入金",
                    "tc": "資金賬戶入金",
                    "en": "Fund Deposit"
                  }
                },
                {
                  "value": 3,
                  "trans": {
                    "zh-CN": "转入TRS账户",
                    "tc": "轉入TRS賬戶",
                    "en": "Transfer to TRS Account"
                  }
                },
                {
                  "value": 4,
                  "trans": {
                    "zh-CN": "TRS账户转出",
                    "tc": "TRS賬戶轉出",
                    "en": "Transfer from TRS Account"
                  }
                },
                {
                  "value": 5,
                  "trans": {
                    "zh-CN": "货币兑换",
                    "tc": "貨幣兌換",
                    "en": "Currency Exchange"
                  }
                }
              ],
              "calculate_type": [
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "以金额计算",
                    "tc": "以金額計算",
                    "en": "Calculate by Amount"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "以数量计算",
                    "tc": "以數量計算",
                    "en": "Calculate by Quantity"
                  }
                },
                {
                  "value": 3,
                  "trans": {
                    "zh-CN": "每笔固定",
                    "tc": "每筆固定",
                    "en": "Fixed per Transaction"
                  }
                }
              ],
              "round_type": [
                {
                  "value": 1,
                  "trans": {
                    "zh-CN": "向上舍入",
                    "tc": "向上捨入",
                    "en": "Round Up"
                  }
                },
                {
                  "value": 2,
                  "trans": {
                    "zh-CN": "四舍五入",
                    "tc": "四捨五入",
                    "en": "Round to Nearest"
                  }
                },
                {
                  "value": 3,
                  "trans": {
                    "zh-CN": "向下舍入",
                    "tc": "向下捨入",
                    "en": "Round Down"
                  }
                }
              ],
              "payment": {
                "type": [
                  {
                    "value": 1,
                    "trans": {
                      "zh-CN": "后台入金",
                      "tc": "後台入金",
                      "en": "Backend Deposit"
                    }
                  },
                  {
                    "value": 2,
                    "trans": {
                      "zh-CN": "网银汇款",
                      "tc": "網銀匯款",
                      "en": "Online Bank Transfer"
                    }
                  },
                  {
                    "value": 3,
                    "trans": {
                      "zh-CN": "FPS转数快",
                      "tc": "FPS轉數快",
                      "en": "FPS Transfer"
                    }
                  },
                  {
                    "value": 4,
                    "trans": {
                      "zh-CN": "eDDA 快捷入金",
                      "tc": "eDDA 快捷入金",
                      "en": "eDDA Quick Deposit"
                    }
                  }
                ],
                "status": [
                  {
                    "value": 0,
                    "trans": {
                      "zh-CN": "待审核",
                      "tc": "待審核",
                      "en": "Audit"
                    }
                  },
                  {
                    "value": 2,
                    "trans": {
                      "zh-CN": "待入账",
                      "tc": "待入賬",
                      "en": "Pending Deposit"
                    }
                  },
                  {
                    "value": 3,
                    "trans": {
                      "zh-CN": "待退款",
                      "tc": "待退款",
                      "en": "Pending Refund"
                    }
                  },
                  {
                    "value": 4,
                    "trans": {
                      "zh-CN": "审核通过",
                      "tc": "審核通過",
                      "en": "passed"
                    }
                  },
                  {
                    "value": 5,
                    "trans": {
                      "zh-CN": "已退款",
                      "tc": "已退款",
                      "en": "Refunded"
                    }
                  },
                  {
                    "value": 6,
                    "trans": {
                      "zh-CN": "驳回",
                      "tc": "駁回",
                      "en": "Reject"
                    }
                  }
                ]
              },
              "withdraw": {
                "status": [
                  {
                    "value": 0,
                    "trans": {
                      "zh-CN": "待审核",
                      "tc": "待審核",
                      "en": "Audit"
                    }
                  },
                  {
                    "value": 2,
                    "trans": {
                      "zh-CN": "审核通过",
                      "tc": "審核通過",
                      "en": "passed"
                    }
                  },
                  {
                    "value": 3,
                    "trans": {
                      "zh-CN": "驳回",
                      "tc": "駁回",
                      "en": "Reject"
                    }
                  }
                ]
              },
              "transfer": {
                "status": [
                  {
                    "value": 1,
                    "trans": {
                      "zh-CN": "待审核",
                      "tc": "待審核",
                      "en": "Audit"
                    }
                  },
                  {
                    "value": 2,
                    "trans": {
                      "zh-CN": "审核通过",
                      "tc": "審核通過",
                      "en": "passed"
                    }
                  },
                  {
                    "value": 3,
                    "trans": {
                      "zh-CN": "驳回",
                      "tc": "駁回",
                      "en": "Reject"
                    }
                  }
                ],
                "from_type": [
                  {
                    "value": 1,
                    "trans": {
                      "zh-CN": "后台添加",
                      "tc": "後台添加",
                      "en": "Backend Added"
                    }
                  },
                  {
                    "value": 2,
                    "trans": {
                      "zh-CN": "客户申请",
                      "tc": "客戶申請",
                      "en": "Customer Application"
                    }
                  }
                ],
                "is_auto_calculate_fee": [
                  {
                    "value": 1,
                    "trans": {
                      "zh-CN": "自动计算",
                      "tc": "自動計算",
                      "en": "Auto Calculate"
                    }
                  },
                  {
                    "value": 0,
                    "trans": {
                      "zh-CN": "手动计算",
                      "tc": "手動計算",
                      "en": "Manual Calculate"
                    }
                  }
                ]
              },
              "exchange": {
                "status": [
                  {
                    "value": 1,
                    "trans": {
                      "zh-CN": "待审核",
                      "tc": "待審核",
                      "en": "Audit"
                    }
                  },
                  {
                    "value": 2,
                    "trans": {
                      "zh-CN": "审核通过",
                      "tc": "審核通過",
                      "en": "passed"
                    }
                  },
                  {
                    "value": 3,
                    "trans": {
                      "zh-CN": "驳回",
                      "tc": "駁回",
                      "en": "Reject"
                    }
                  }
                ]
              },
              "assure": {
                "type": [
                  {
                    "value": 1,
                    "trans": {
                      "zh-CN": "新增担保",
                      "tc": "新增擔保",
                      "en": "Add Assurance"
                    }
                  },
                  {
                    "value": 2,
                    "trans": {
                      "zh-CN": "取消担保",
                      "tc": "取消擔保",
                      "en": "Cancel Assurance"
                    }
                  }
                ]
              },
              "record": {
                "from_type": [
                    {
                        "value": 1,
                        "trans": {
                            "zh-CN": "入金",
                            "tc": "入金",
                            "en": "Deposit"
                        }
                    },
                    {
                        "value": 2,
                        "trans": {
                            "zh-CN": "出金",
                            "tc": "出金",
                            "en": "Withdrawal"
                        }
                    },
                    {
                        "value": 3,
                        "trans": {
                            "zh-CN": "转入TRS账户",
                            "tc": "轉入TRS賬戶",
                            "en": "Transfer to TRS Account"
                        }
                    },
                    {
                        "value": 4,
                        "trans": {
                            "zh-CN": "转出TRS账户",
                            "tc": "轉出TRS賬戶",
                            "en": "Transfer from TRS Account"
                        }
                    },
                    {
                        "value": 5,
                        "trans": {
                            "zh-CN": "兑换入金",
                            "tc": "兌換入金",
                            "en": "Exchange Deposit"
                        }
                    },
                    {
                        "value": 6,
                        "trans": {
                            "zh-CN": "兑换出金",
                            "tc": "兌換出金",
                            "en": "Exchange Withdrawal"
                        }
                    },
                    {
                        "value": 7,
                        "trans": {
                            "zh-CN": "担保TRS账户",
                            "tc": "擔保TRS賬戶",
                            "en": "Guarantee TRS Account"
                        }
                    },
                    {
                        "value": 8,
                        "trans": {
                            "zh-CN": "取消担保TRS账户",
                            "tc": "取消擔保TRS賬戶",
                            "en": "Cancel Guarantee TRS Account"
                        }
                    },
                    {
                        "value": 9,
                        "trans": {
                            "zh-CN": "TRS账户初始化",
                            "tc": "TRS賬戶初始化",
                            "en": "TRS Account Initialization"
                        }
                    },
                    {
                        "value": 10,
                        "trans": {
                            "zh-CN": "结算TRS账户",
                            "tc": "結算TRS賬戶",
                            "en": "Settlement of TRS Account"
                        }
                    },
                    {
                        "value": 11,
                        "trans": {
                            "zh-CN": "期权交易",
                            "tc": "期權交易",
                            "en": "Options Trading"
                        }
                    },
                    {
                        "value": 12,
                        "trans": {
                            "zh-CN": "财富合约结算",
                            "tc": "財富合約結算",
                            "en": "Wealth Contract Settlement"
                        }
                    },
                    {
                        "value": 13,
                        "trans": {
                            "zh-CN": "TRS账户分红派息",
                            "tc": "TRS賬戶分紅派息",
                            "en": "TRS Account Dividend Distribution"
                        }
                    },
                    {
                        "value": 14,
                        "trans": {
                            "zh-CN": "TRS账户扣除利息",
                            "tc": "TRS賬戶扣除利息",
                            "en": "TRS Account Interest Deduction"
                        }
                    }
                ],
                "type": [
                    {
                        "value": 1,
                        "trans": {
                            "zh-CN": "冻结现金",
                            "tc": "凍結現金",
                            "en": "Frozen Cash"
                        }
                    },
                    {
                        "value": 2,
                        "trans": {
                            "zh-CN": "可用现金",
                            "tc": "可用現金",
                            "en": "Available Cash"
                        }
                    },
                    {
                        "value": 3,
                        "trans": {
                            "zh-CN": "总现金",
                            "tc": "總現金",
                            "en": "Total Cash"
                        }
                    }
                ]
            },
            "wealthrecord": {
                "from_type": [
                    {
                        "value": 1,
                        "trans": {
                            "zh-CN": "存入资金",
                            "tc": "存入資金",
                            "en": "Deposit"
                        }
                    },
                    {
                        "value": 2,
                        "trans": {
                            "zh-CN": "提取资金",
                            "tc": "提取資金",
                            "en": "Withdrawal"
                        }
                    },
                    {
                        "value": 5,
                        "trans": {
                            "zh-CN": "兑换入金",
                            "tc": "兌換入金",
                            "en": "Exchange Deposit"
                        }
                    },
                    {
                        "value": 6,
                        "trans": {
                            "zh-CN": "兑换出金",
                            "tc": "兌換出金",
                            "en": "Exchange Withdrawal"
                        }
                    },
                    {
                        "value": 11,
                        "trans": {
                            "zh-CN": "交易成功",
                            "tc": "交易成功",
                            "en": "Transaction Success"
                        }
                    },
                    {
                        "value": 12,
                        "trans": {
                            "zh-CN": "财富合约结算",
                            "tc": "財富合約結算",
                            "en": "Wealth Contract Settlement"
                        }
                    }
                ],
                "type": [
                    {
                        "value": 1,
                        "trans": {
                            "zh-CN": "冻结现金",
                            "tc": "凍結現金",
                            "en": "Frozen Cash"
                        }
                    },
                    {
                        "value": 2,
                        "trans": {
                            "zh-CN": "可用现金",
                            "tc": "可用現金",
                            "en": "Available Cash"
                        }
                    },
                    {
                        "value": 3,
                        "trans": {
                            "zh-CN": "总现金",
                            "tc": "總現金",
                            "en": "Total Cash"
                        }
                    }
                ]
            },
            "bankRegion": [
                {
                    "value": 1,
                    "trans": {
                        "zh-CN": "中国内地",
                        "tc": "中國內地",
                        "en": "Mainland China"
                    }
                },
                {
                    "value": 2,
                    "trans": {
                        "zh-CN": "中国香港",
                        "tc": "中國香港",
                        "en": "Hong Kong, China"
                    }
                },
                {
                    "value": 3,
                    "trans": {
                        "zh-CN": "美国",
                        "tc": "美國",
                        "en": "United States"
                    }
                },
                {
                    "value": 4,
                    "trans": {
                        "zh-CN": "其他国家/地区",
                        "tc": "其他國家/地區",
                        "en": "Other Countries/Regions"
                    }
                }
            ]
        },
        "pi": {
            "status": [
                {
                    "value": 1,
                    "trans": {
                        "zh-CN": "待审核",
                        "tc": "待審核",
                        "en": "Audit"
                    }
                },
                {
                    "value": 2,
                    "trans": {
                        "zh-CN": "审核通过",
                        "tc": "審核通過",
                        "en": "passed"
                    }
                },
                {
                    "value": 3,
                    "trans": {
                        "zh-CN": "驳回",
                        "tc": "駁回",
                        "en": "Reject"
                    }
                }
            ],
            "from_type": [
                {
                    "value": 1,
                    "trans": {
                        "zh-CN": "用户测评",
                        "tc": "用戶測評",
                        "en": "User Evaluation"
                    }
                },
                {
                    "value": 2,
                    "trans": {
                        "zh-CN": "后台添加",
                        "tc": "後台添加",
                        "en": "Backend Addition"
                    }
                }
            ]
        },
        "risk": {
            "status": [
                {
                    "value": 1,
                    "trans": {
                        "zh-CN": "待审核",
                        "tc": "待審核",
                        "en": "Audit"
                    }
                },
                {
                    "value": 2,
                    "trans": {
                        "zh-CN": "审核通过",
                        "tc": "審核通過",
                        "en": "passed"
                    }
                },
                {
                    "value": 3,
                    "trans": {
                        "zh-CN": "驳回",
                        "tc": "駁回",
                        "en": "reject"
                    }
                }
            ],
            "from_type": [
                {
                    "value": 1,
                    "trans": {
                        "zh-CN": "用户测评",
                        "tc": "用戶測評",
                        "en": "User Evaluation"
                    }
                },
                {
                    "value": 2,
                    "trans": {
                        "zh-CN": "后台添加",
                        "tc": "後台添加",
                        "en": "Backend Addition"
                    }
                }
            ],
            "risk_level": [
                {
                    "value": 1,
                    "trans": {
                        "zh-CN": "低",
                        "tc": "低",
                        "en": "Low"
                    }
                },
                {
                    "value": 2,
                    "trans": {
                        "zh-CN": "中-低",
                        "tc": "中-低",
                        "en": "Medium-Low"
                    }
                },
                {
                    "value": 3,
                    "trans": {
                        "zh-CN": "中",
                        "tc": "中",
                        "en": "Medium"
                    }
                },
                {
                    "value": 4,
                    "trans": {
                        "zh-CN": "中-高",
                        "tc": "中-高",
                        "en": "Medium-High"
                    }
                },
                {
                    "value": 5,
                    "trans": {
                        "zh-CN": "高",
                        "tc": "高",
                        "en": "High"
                    }
                }
            ]
        },
        "bankCard": {
            "status": [
                {
                    "value": 0,
                    "trans": {
                        "zh-CN": "绑定中",
                        "tc": "綁定中",
                        "en": "Binding"
                    }
                },
                {
                    "value": 1,
                    "trans": {
                        "zh-CN": "已绑定",
                        "tc": "已綁定",
                        "en": "Bound"
                    }
                },
                {
                    "value": 2,
                    "trans": {
                        "zh-CN": "绑定失败",
                        "tc": "綁定失敗",
                        "en": "Binding Failed"
                    }
                }
            ],
            "system_bank_card_payment_type": [
                {
                    "value": 1,
                    "trans": {
                        "zh-CN": "后台入金",
                        "tc": "後台入金",
                        "en": "Backend Deposit"
                    }
                },
                {
                    "value": 2,
                    "trans": {
                        "zh-CN": "网银汇款",
                        "tc": "網銀匯款",
                        "en": "Online Banking Transfer"
                    }
                },
                {
                    "value": 3,
                    "trans": {
                        "zh-CN": "FPS转数快",
                        "tc": "FPS轉數快",
                        "en": "FPS Transfer"
                    }
                },
                {
                    "value": 4,
                    "trans": {
                        "zh-CN": "eDDA 快捷入金",
                        "tc": "eDDA 快捷入金",
                        "en": "eDDA Quick Deposit"
                    }
                },
                {
                    "value": 5,
                    "trans": {
                        "zh-CN": "银证转账",
                        "tc": "銀證轉賬",
                        "en": "Securities Transfer"
                    }
                }
            ]
        },
        "customer": {
            "otc": {
                "status": [
                    {
                        "value": -1,
                        "trans": {
                            "zh-CN": "全部",
                            "tc": "全部",
                            "en": "All"
                        }
                    },
                    {
                        "value": 1,
                        "trans": {
                            "zh-CN": "启用",
                            "tc": "啟用",
                            "en": "Enabled"
                        }
                    },
                    {
                        "value": 0,
                        "trans": {
                            "zh-CN": "禁用",
                            "tc": "禁用",
                            "en": "Disabled"
                        }
                    }
                ],
                "sex": [
                    {
                        "value": 0,
                        "trans": {
                            "zh-CN": "未知",
                            "tc": "未知",
                            "en": "Unknown"
                        }
                    },
                    {
                        "value": 2,
                        "trans": {
                            "zh-CN": "女",
                            "tc": "女",
                            "en": "Female"
                        }
                    },
                    {
                        "value": 1,
                        "trans": {
                            "zh-CN": "男",
                            "tc": "男",
                            "en": "Male"
                        }
                    }
                ]
            }
        },
        "manager": {
            "managerList": {
                "status": [
                    {
                        "value": -1,
                        "trans": {
                            "zh-CN": "全部",
                            "tc": "全部",
                            "en": "All"
                        }
                    },
                    {
                        "value": 1,
                        "trans": {
                            "zh-CN": "启用",
                            "tc": "啟用",
                            "en": "Enabled"
                        }
                    },
                    {
                        "value": 0,
                        "trans": {
                            "zh-CN": "禁用",
                            "tc": "禁用",
                            "en": "Disabled"
                        }
                    }
                ]
            }
        },
        "package":{
            "charge":{
                "status": [
                    {
                        "value": 0,
                        "trans": {
                            "zh-CN": "禁用",
                            "tc": "禁用",
                            "en": "Disable"
                        }
                    },
                    {
                        "value": 1,
                        "trans": {
                            "zh-CN": "启用",
                            "tc": "啟用",
                            "en": "Enable"
                        }
                    }
                ],
                "create":{
                    "type":[
                        {
                            "value": 1,
                            "trans": {
                                "zh-CN": "资金账户出金",
                                "tc": "資金賬戶出金",
                                "en": "Fund account withdrawal"
                            }
                        },
                        {
                            "value": 2,
                            "trans": {
                                "zh-CN": "资金账户入金",
                                "tc": "資金賬戶入金",
                                "en": "Fund account deposit"
                            }
                        },
                        {
                            "value": 3,
                            "trans": {
                                "zh-CN": "转入TRS账户",
                                "tc": "轉入TRS賬戶",
                                "en": "Transfer to TRS account"
                            }
                        },
                        {
                            "value": 4,
                            "trans": {
                                "zh-CN": "TRS账户转出",
                                "tc": "TRS賬戶轉出",
                                "en": "TRS account transfer out"
                            }
                        },
                        {
                            "value": 5,
                            "trans": {
                                "zh-CN": "货币兑换",
                                "tc": "貨幣兌換",
                                "en": "currency exchange"
                            }
                        },
                    ],
                    "wealthtype":[
                        {
                            "value": 1,
                            "trans": {
                                "zh-CN": "资金账户出金",
                                "tc": "資金賬戶出金",
                                "en": "Fund account withdrawal"
                            }
                        },
                        {
                            "value": 2,
                            "trans": {
                                "zh-CN": "资金账户入金",
                                "tc": "資金賬戶入金",
                                "en": "Fund account deposit"
                            }
                        },
                        {
                            "value": 5,
                            "trans": {
                                "zh-CN": "货币兑换",
                                "tc": "貨幣兌換",
                                "en": "currency exchange"
                            }
                        },
                    ],
                    "calculate_type":[
                        {
                            "value": 1,
                            "trans": {
                                "zh-CN": "以金额计算",
                                "tc": "以金額計算",
                                "en": "Calculated by amount"
                            }
                        },
                        {
                            "value": 3,
                            "trans": {
                                "zh-CN": "每笔固定",
                                "tc": "每筆固定",
                                "en": "Fixed per transaction"
                            }
                        },
                    ],
                    "round_type":[
                        {
                            "value": 1,
                            "trans": {
                                "zh-CN": "向上舍入",
                                "tc": "向上舍入",
                                "en": "Round Up"
                            }
                        },
                        {
                            "value": 2,
                            "trans": {
                                "zh-CN": "四舍五入",
                                "tc": "以數量計算",
                                "en": "half adjust"
                            }
                        },
                        {
                            "value": 3,
                            "trans": {
                                "zh-CN": "向下舍入",
                                "tc": "向下舍入",
                                "en": "round down"
                            }
                        },
                    ]
                }
            },
        }
    },
    wealth: {
      account: {
        account: {
          status: [
            {
              value: -1,
              trans: {
                "zh-CN": "全部",
                tc: "全部",
                en: "All",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "启用",
                tc: "启用",
                en: "Enabled",
              },
            },
            {
              value: 0,
              trans: {
                "zh-CN": "禁用",
                tc: "禁用",
                en: "Disabled",
              },
            },
          ],
        },
      },
      product: {
        type: {
          status: [
            {
              value: -1,
              trans: {
                "zh-CN": "全部",
                tc: "全部",
                en: "All",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "启用",
                tc: "启用",
                en: "Enabled",
              },
            },
            {
              value: 0,
              trans: {
                "zh-CN": "禁用",
                tc: "禁用",
                en: "Disabled",
              },
            },
          ],
        },
        offer: {
          status: [
            {
              value: -1,
              trans: {
                "zh-CN": "全部",
                tc: "全部",
                en: "All",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "启用",
                tc: "启用",
                en: "Enabled",
              },
            },
            {
              value: 0,
              trans: {
                "zh-CN": "禁用",
                tc: "禁用",
                en: "Disabled",
              },
            },
          ],
        },
      },
      transaction: {
        inquiryRecord: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "询价中",
                tc: "詢價中",
                en: "In inquiry",
              },
              color: "#F59A23",
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已报价",
                tc: "已報價",
                en: "Quoted",
              },
              color: "#0F62FE",
            },
            {
              value: 2,
              trans: {
                "zh-CN": "已挂单",
                tc: "已掛單",
                en: "Posted",
              },
              color: "#7F7F7F",
            },
            {
              value: 3,
              trans: {
                "zh-CN": "已失效",
                tc: "已失效",
                en: "Expired",
              },
              color: "#D9001B",
            },
          ],
        },
        counterparty: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "禁用",
                tc: "禁用",
                en: "Disable",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "启用",
                tc: "啟用",
                en: "Enable",
              },
            },
          ],
        },
        earlyExercise: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "申请中",
                tc: "申請中",
                en: "Applying",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已通过",
                tc: "已通過",
                en: "Passed",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "未通过",
                tc: "未通過",
                en: "Fail",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "已取消",
                tc: "已取消",
                en: "Canceled",
              },
            },
          ],
        },
        optionPosition: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "存续中",
                tc: "存續中",
                en: "Existing",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "待结算",
                tc: "待結算",
                en: "To be settled",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "已结算",
                tc: "已結算",
                en: "Settled",
              },
            },
          ],
        },
        transactionRecords: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "已挂单",
                tc: "已掛單",
                en: "On order",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "交易中",
                tc: "交易中",
                en: "In transaction",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "部分成功",
                tc: "部分成功",
                en: "Partial Success",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "交易成功",
                tc: "交易成功",
                en: "Successful transaction",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "撤销中",
                tc: "撤銷中",
                en: "Revoking",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "已撤销",
                tc: "已撤銷",
                en: "Transaction cancellation",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "交易失败",
                tc: "交易失敗",
                en: "Transaction failed",
              },
            },
          ],
          status1: [
            {
              value: 1,
              trans: {
                "zh-CN": "交易中",
                tc: "交易中",
                en: "In transaction",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "部分成交",
                tc: "部分成交",
                en: "Partial transaction",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "已成交",
                tc: "已成交",
                en: "Successful transaction",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "撤销中",
                tc: "撤銷中",
                en: "Revoking",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "已撤销",
                tc: "已撤銷",
                en: "Transaction cancellation",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "交易失败",
                tc: "交易失敗",
                en: "Transaction failed",
              },
            },
          ],
          status2: [
            {
              value: 2,
              trans: {
                "zh-CN": "部分成交",
                tc: "部分成交",
                en: "Partial transaction",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "已成交",
                tc: "已成交",
                en: "Successful transaction",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "交易失败",
                tc: "交易失敗",
                en: "Transaction failed",
              },
            },
          ],
          status3: [
            {
              value: 0,
              trans: {
                "zh-CN": "已挂单",
                tc: "已掛單",
                en: "Posted",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "交易中",
                tc: "交易中",
                en: "In transaction",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "部分成交",
                tc: "部分成交",
                en: "Partial transaction",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "交易成功",
                tc: "交易成功",
                en: "Successful transaction",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "交易失败",
                tc: "交易失敗",
                en: "Transaction failed",
              },
            },
          ],
          status4: [
            {
              value: 0,
              trans: {
                "zh-CN": "已挂单",
                tc: "已掛單",
                en: "On order",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "交易中",
                tc: "交易中",
                en: "In transaction",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "部分成功",
                tc: "部分成功",
                en: "Partial Success",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "交易成功",
                tc: "交易成功",
                en: "Successful transaction",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "已撤销",
                tc: "已撤銷",
                en: "Transaction cancellation",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "交易失败",
                tc: "交易失敗",
                en: "Transaction failed",
              },
            },
          ],
        },
      },
    },
    system: {
      bank_region: [
        {
          value: 1,
          trans: {
            "zh-CN": "大陆",
            tc: "大陸",
            en: "Mainland China",
          },
        },
        {
          value: 2,
          trans: {
            "zh-CN": "中国香港",
            tc: "中國香港",
            en: "Hong Kong, China",
          },
        },
        {
          value: 3,
          trans: {
            "zh-CN": "美国",
            tc: "美國",
            en: "United States",
          },
        },
        {
          value: 4,
          trans: {
            "zh-CN": "其他国家/地区",
            tc: "其他國家/地區",
            en: "Other Countries/Regions",
          },
        },
      ],
      user: {
        status: [
          {
            value: 1,
            trans: {
              "zh-CN": "启用",
              tc: "啟用",
              en: "Enabled",
            },
          },
          {
            value: 0,
            trans: {
              "zh-CN": "禁用",
              tc: "禁用",
              en: "Disabled",
            },
          },
        ],
      },
      event: {
        status: [
          {
            value: 0,
            trans: {
              "zh-CN": "待执行",
              tc: "待執行",
              en: "Pending Execution",
            },
          },
          {
            value: 1,
            trans: {
              "zh-CN": "执行成功",
              tc: "執行成功",
              en: "Execution Successful",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "执行失败",
              tc: "執行失敗",
              en: "Execution Failed",
            },
          },
        ],
      },
      log: {
        userDevice: [
          {
            value: "Android",
            trans: {
              "zh-CN": "Android",
              tc: "Android",
              en: "Android",
            },
          },
          {
            value: "iOS",
            trans: {
              "zh-CN": "iOS",
              tc: "iOS",
              en: "iOS",
            },
          },
        ],
      },
      operationLog: {
        operate_method: [
          {
            value: "GET",
            trans: {
              "zh-CN": "GET",
              tc: "GET",
              en: "GET",
            },
          },
          {
            value: "POST",
            trans: {
              "zh-CN": "POST",
              tc: "POST",
              en: "POST",
            },
          },
          {
            value: "DELETE",
            trans: {
              "zh-CN": "DELETE",
              tc: "DELETE",
              en: "DELETE",
            },
          },
          {
            value: "PUT",
            trans: {
              "zh-CN": "PUT",
              tc: "PUT",
              en: "PUT",
            },
          },
        ],
      },
      version: {
        type: [
          {
            value: 1,
            trans: {
              "zh-CN": "Android",
              tc: "Android",
              en: "Android",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "iOS",
              tc: "iOS",
              en: "iOS",
            },
          },
        ],
        download_type: [
          {
            value: 1,
            trans: {
              "zh-CN": "安装包",
              tc: "安裝包",
              en: "Installation Package",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "链接",
              tc: "連結",
              en: "Link",
            },
          },
        ],
        status: [
          {
            value: 0,
            trans: {
              "zh-CN": "待发布",
              tc: "待發布",
              en: "Pending Release",
            },
          },
          {
            value: 1,
            trans: {
              "zh-CN": "已发布",
              tc: "已發布",
              en: "Published",
            },
          },
        ],
        enforce: [
          {
            value: 0,
            trans: {
              "zh-CN": "不强制更新",
              tc: "不強制更新",
              en: "Not Mandatory",
            },
          },
          {
            value: 1,
            trans: {
              "zh-CN": "强制更新",
              tc: "強制更新",
              en: "Mandatory",
            },
          },
        ],
      },
    },
    trs: {
      account: {
        use_status: [
          {
            value: 1,
            trans: {
              "zh-CN": "使用中",
              tc: "使用中",
              en: "In Use",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "已到期",
              tc: "已到期",
              en: "Expired",
            },
          },
        ],
        status: [
          {
            value: 0,
            trans: {
              "zh-CN": "已到期",
              tc: "已到期",
              en: "Expired",
            },
          },
          {
            value: 1,
            trans: {
              "zh-CN": "使用中",
              tc: "使用中",
              en: "In Use",
            },
          },
        ],
        trade_status: [
          {
            value: 1,
            trans: {
              "zh-CN": "正常交易",
              tc: "正常交易",
              en: "Normal Trading",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "限制买入",
              tc: "限制買入",
              en: "Restricted Buying",
            },
          },
          {
            value: 3,
            trans: {
              "zh-CN": "禁止交易",
              tc: "禁止交易",
              en: "Prohibited Trading",
            },
          },
        ],
        withdraw: {
          status: [
            {
              value: 1,
              trans: {
                "zh-CN": "待审核",
                tc: "待審核",
                en: "Audit",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "审核通过",
                tc: "審核通過",
                en: "passed",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "驳回",
                tc: "駁回",
                en: "Reject",
              },
            },
          ],
          apply: {
            from_type: [
              {
                value: 1,
                trans: {
                  "zh-CN": "后台添加",
                  tc: "後台添加",
                  en: "Added by Backend",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "客户申请",
                  tc: "客戶申請",
                  en: "Customer Application",
                },
              },
            ],
          },
        },
        assure: {
          type: [
            {
              value: 1,
              trans: {
                "zh-CN": "新增担保",
                tc: "新增擔保",
                en: "Add Assure",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "取消担保",
                tc: "取消擔保",
                en: "Cancel Assure",
              },
            },
          ],
        },
        risk_control_calculate_type: [
          {
            value: 1,
            trans: {
              "zh-CN": "独立计算",
              tc: "獨立計算",
              en: "Independent Calculation",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "担保计算",
              tc: "擔保計算",
              en: "Assured Calculation",
            },
          },
        ],
        risk_control_position_type: [
          {
            value: 1,
            trans: {
              "zh-CN": "全部平仓",
              tc: "全部平倉",
              en: "Close All Positions",
            },
          },
          {
            value: 0,
            trans: {
              "zh-CN": "保留持仓",
              tc: "保留持倉",
              en: "Keep Positions",
            },
          },
        ],
        risk_control_status: [
          {
            value: 1,
            trans: {
              "zh-CN": "安全",
              tc: "安全",
              en: "Safe",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "触发风控线",
              tc: "觸發風控線",
              en: "Risk Control Triggered",
            },
          },
        ],
        interest_accrual_type: [
          {
            value: 1,
            trans: {
              "zh-CN": "交易计息",
              tc: "交易計息",
              en: "Transaction Interest Calculation",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "融资计息",
              tc: "融資計息",
              en: "Financing Interest Calculation",
            },
          },
        ],
        interest_round_type: [
          {
            value: 1,
            trans: {
              "zh-CN": "向上舍入",
              tc: "向上舍入",
              en: "Round Up",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "四舍五入",
              tc: "四捨五入",
              en: "Round to Nearest",
            },
          },
          {
            value: 3,
            trans: {
              "zh-CN": "向下舍入",
              tc: "向下舍入",
              en: "Round Down",
            },
          },
        ],
        interest_deduct_account: [
          {
            value: 1,
            trans: {
              "zh-CN": "TRS账户",
              tc: "TRS賬戶",
              en: "TRS Account",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "资金账户",
              tc: "資金賬戶",
              en: "Funds Account",
            },
          },
        ],
        deduct_type: [
          {
            value: "daily_deduct",
            trans: {
              "zh-CN": "每日扣除",
              tc: "每日扣除",
              en: "Daily Deduction",
            },
          },
        ],
        public_deduct_type: [
          {
            value: "daily_deduct",
            trans: {
              "zh-CN": "每日扣除",
              tc: "每日扣除",
              en: "Daily Deduction",
            },
          },
          {
            value: "daily_freeze_monthly_deduct",
            trans: {
              "zh-CN": "每日累计次月扣息",
              tc: "每日累計次月扣息",
              en: "Daily Accumulated Monthly Deduction",
            },
          },
        ],
        hx_status: [
          {
            value: "1",
            trans: {
              "zh-CN": "已扣",
              tc: "已扣",
              en: "Deducted",
            },
          },
          {
            value: "2",
            trans: {
              "zh-CN": "待扣",
              tc: "待扣",
              en: "Pending Deduction",
            },
          },
        ],
        hx_deduct_type: [
          {
            value: "daily_freeze_monthly_deduct",
            trans: {
              "zh-CN": "每日累计次月扣息",
              tc: "每日累計次月扣息",
              en: "Daily Accumulated Monthly Deduction",
            },
          },
        ],
        settlement_status: [
          {
            value: 0,
            trans: {
              "zh-CN": "平仓中",
              tc: "平倉中",
              en: "Closing",
            },
          },
          {
            value: 1,
            trans: {
              "zh-CN": "待结算",
              tc: "待結算",
              en: "Pending Settlement",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "已结算",
              tc: "已結算",
              en: "Settled",
            },
          },
        ],
        apply: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "待审核",
                tc: "待審核",
                en: "Audit",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "审核通过",
                tc: "審核通過",
                en: "passed",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "驳回",
                tc: "駁回",
                en: "Reject",
              },
            },
          ],
        },
        finance: {
          apply: {
            status: [
              {
                value: 1,
                trans: {
                  "zh-CN": "待审核",
                  tc: "待審核",
                  en: "Audit",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "审核通过",
                  tc: "審核通過",
                  en: "passed",
                },
              },
              {
                value: 3,
                trans: {
                  "zh-CN": "驳回",
                  tc: "驳回",
                  en: "Reject",
                },
              },
            ],
            from_type: [
              {
                value: 1,
                trans: {
                  "zh-CN": "后台添加",
                  tc: "後台添加",
                  en: "Backend Addition",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "客户申请",
                  tc: "客户申請",
                  en: "Customer Application",
                },
              },
            ],
            change_type: [
              {
                value: 1,
                trans: {
                  "zh-CN": "增加",
                  tc: "增加",
                  en: "Increase",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "减少",
                  tc: "減少",
                  en: "Decrease",
                },
              },
            ],
            is_follow: [
              {
                value: 1,
                trans: {
                  "zh-CN": "是",
                  tc: "是",
                  en: "yes",
                },
              },
              {
                value: 0,
                trans: {
                  "zh-CN": "否",
                  tc: "否",
                  en: "NO",
                },
              },
            ],
          },
        },
        symbol: {
          apply: {
            status: [
              {
                value: 0,
                trans: {
                  "zh-CN": "待审核",
                  tc: "待審核",
                  en: "Audit",
                },
              },
              {
                value: 1,
                trans: {
                  "zh-CN": "审核通过",
                  tc: "審核通過",
                  en: "passed",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "驳回",
                  tc: "駁回",
                  en: "Reject",
                },
              },
            ],
          },
          type: [
            {
              value: 1,
              trans: {
                "zh-CN": "白名单",
                tc: "白名單",
                en: "Whitelist",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "黑名单",
                tc: "黑名單",
                en: "Blacklist",
              },
            },
          ],
        },
        terminate: {
          apply: {
            status: [
              {
                value: 1,
                trans: {
                  "zh-CN": "待审核",
                  tc: "待審核",
                  en: "Audit",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "审核通过",
                  tc: "審核通過",
                  en: "passed",
                },
              },
              {
                value: 3,
                trans: {
                  "zh-CN": "驳回",
                  tc: "駁回",
                  en: "Reject",
                },
              },
            ],
          },
        },
      },
      settlement: {
        dividend: {
          status: [
            {
              value: 1,
              trans: {
                "zh-CN": "待登记",
                tc: "待登記",
                en: "Pending Registration",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "待确认",
                tc: "待確認",
                en: "Pending Confirmation",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "待执行",
                tc: "待執行",
                en: "Pending Execution",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "已执行",
                tc: "已執行",
                en: "Executed",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "已取消",
                tc: "已取消",
                en: "Cancelled",
              },
            },
          ],
        },
      },
      order: {
        round_type: [
          {
            value: 1,
            trans: {
              "zh-CN": "向上舍入",
              tc: "向上捨入",
              en: "Round Up",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "四舍五入",
              tc: "四捨五入",
              en: "Round to Nearest",
            },
          },
          {
            value: 3,
            trans: {
              "zh-CN": "向下舍入",
              tc: "向下捨入",
              en: "Round Down",
            },
          },
        ],
        order_charge: {
          type: [
            {
              value: 1,
              trans: {
                "zh-CN": "券商收费项",
                tc: "券商收費項目",
                en: "Brokerage Charges",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "代收费项",
                tc: "代收費項目",
                en: "Agent Charges",
              },
            },
          ],
        },
      },
      risk_control: {
        status: [
          {
            value: 1,
            trans: {
              "zh-CN": "解除预警状态",
              tc: "解除預警狀態",
              en: "Dismiss Alert",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "触发预警线",
              tc: "觸發預警線",
              en: "Alert Triggered",
            },
          },
          {
            value: 3,
            trans: {
              "zh-CN": "触发平仓线",
              tc: "觸發平倉線",
              en: "Close Triggered",
            },
          },
        ],
      },
      channel: {
        status: [
          {
            value: 1,
            trans: {
              "zh-CN": "启用",
              tc: "啟用",
              en: "Enabled",
            },
          },
          {
            value: 0,
            trans: {
              "zh-CN": "禁用",
              tc: "禁用",
              en: "Disabled",
            },
          },
        ],
        health_status: [
          {
            value: 1,
            trans: {
              "zh-CN": "正常",
              tc: "正常",
              en: "Normal",
            },
          },
          {
            value: 0,
            trans: {
              "zh-CN": "异常",
              tc: "異常",
              en: "Abnormal",
            },
          },
        ],
        channel: [
          {
            value: "ayers",
            trans: {
              "zh-CN": "ayers",
              tc: "ayers",
              en: "ayers",
            },
          },
          {
            value: "fix",
            trans: {
              "zh-CN": "fix",
              tc: "fix",
              en: "fix",
            },
          },
          {
            value: "yuanyu",
            trans: {
              "zh-CN": "yuanyu",
              tc: "yuanyu",
              en: "yuanyu",
            },
          },
        ],
        version: [
          {
            value: "v1",
            trans: {
              "zh-CN": "v1",
              tc: "v1",
              en: "v1",
            },
          },
        ],
        account: {
          status: [
            {
              value: 1,
              trans: {
                "zh-CN": "在线",
                tc: "在線",
                en: "Online",
              },
            },
            {
              value: 0,
              trans: {
                "zh-CN": "下线",
                tc: "下線",
                en: "Offline",
              },
            },
          ],
        },
      },
      notice: {
        message: {
          type: [
            {
              value: "risk_control_notice",
              trans: {
                "zh-CN": "触发风控",
                tc: "觸發風控",
                en: "Triggered risk control",
              },
            },
            {
              value: "not_upload_create_odd_lot_order",
              trans: {
                "zh-CN": "碎股单",
                tc: "碎股單",
                en: "Odd-lot order not uploaded",
              },
            },
            {
              value: "asset_account_payment",
              trans: {
                "zh-CN": "资金账户入金申请",
                tc: "資金帳戶入金申請",
                en: "Asset account deposit application",
              },
            },
            {
              value: "asset_account_withdraw",
              trans: {
                "zh-CN": "资金账户提现申请",
                tc: "資金帳戶提現申請",
                en: "Asset account withdrawal application",
              },
            },
            {
              value: "asset_account_exchange",
              trans: {
                "zh-CN": "资金账户货币兑换申请",
                tc: "資金帳戶貨幣兌換申請",
                en: "Asset account currency exchange application",
              },
            },
            {
              value: "trs_account_payment",
              trans: {
                "zh-CN": "资金账户货币划转申请",
                tc: "資金帳戶貨幣劃轉申請",
                en: "TRS account currency transfer application",
              },
            },
            {
              value: "trs_account_withdraw",
              trans: {
                "zh-CN": "TRS账户提现申请",
                tc: "TRS帳戶提現申請",
                en: "TRS account withdrawal application",
              },
            },
            {
              value: "trs_account_apply",
              trans: {
                "zh-CN": "TRS账户申请",
                tc: "TRS帳戶申請",
                en: "TRS account application",
              },
            },
            {
              value: "trs_account_investment_scope",
              trans: {
                "zh-CN": "TRS账户单票额度申请",
                tc: "TRS帳戶單票額度申請",
                en: "TRS account single ticket limit application",
              },
            },
            {
              value: "trs_account_finance",
              trans: {
                "zh-CN": "TRS账户融资额度申请",
                tc: "TRS帳戶融資額度申請",
                en: "TRS account financing limit application",
              },
            },
            {
              value: "trs_account_cancel",
              trans: {
                "zh-CN": "TRS账户提前解约申请",
                tc: "TRS帳戶提前解約申請",
                en: "TRS account early termination application",
              },
            },
            {
              value: "trs_account_time",
              trans: {
                "zh-CN": "TRS账户续约申请",
                tc: "TRS帳戶續約申請",
                en: "TRS account renewal application",
              },
            },
            {
              value: "pi_auth",
              trans: {
                "zh-CN": "PI认证",
                tc: "PI認證",
                en: "PI authentication",
              },
            },
            {
              value: "risk_assessment",
              trans: {
                "zh-CN": "风险测评",
                tc: "風險評估",
                en: "Risk assessment",
              },
            },
            {
              value: "dividend_complete",
              trans: {
                "zh-CN": "分红派息完成",
                tc: "分紅派息完成",
                en: "Dividend payment completed",
              },
            },
            {
              value: "split_complete",
              trans: {
                "zh-CN": "拆股并股完成",
                tc: "拆股並股完成",
                en: "Completion of stock split and merger",
              },
            },
          ],
        },
        subscribeMessage: {
          type: [
            {
              value: "risk_control_notice",
              trans: {
                "zh-CN": "触发风控",
                tc: "觸發風控",
                en: "Trigger risk control",
              },
            },
            {
              value: "not_upload_create_odd_lot_order",
              trans: {
                "zh-CN": "碎股单",
                tc: "碎股單",
                en: "Broken Stock Order",
              },
            },
          ],
        },
      },
      package: {
        finance: {
          financingInterest: [
            {
              value: 1,
              trans: {
                "zh-CN": "包含保证金",
                tc: "包含保證金",
                en: "Including deposit",
              },
            },
            {
              value: 0,
              trans: {
                "zh-CN": "不包含保证金",
                tc: "不包含保證金",
                en: "Excluding margin",
              },
            },
          ],
        },
        trade: {
          create: {
            type: [
              {
                value: 1,
                trans: {
                  "zh-CN": "券商收费项",
                  tc: "券商收費項",
                  en: "Fee items for securities firms",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "代收费项",
                  tc: "代收費項",
                  en: "Agency fee items",
                },
              },
            ],
            calculate_type: [
              {
                value: 1,
                trans: {
                  "zh-CN": "以金额计算",
                  tc: "以金額計算",
                  en: "Calculated by amount",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "以数量计算",
                  tc: "以數量計算",
                  en: "Calculated by quantity",
                },
              },
              {
                value: 3,
                trans: {
                  "zh-CN": "每笔固定",
                  tc: "每筆固定",
                  en: "Fixed per transaction",
                },
              },
            ],
            round_type: [
              {
                value: 1,
                trans: {
                  "zh-CN": "向上舍入",
                  tc: "向上舍入",
                  en: "Round Up",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "四舍五入",
                  tc: "四舍五入",
                  en: "Half Adjust",
                },
              },
              {
                value: 3,
                trans: {
                  "zh-CN": "向下舍入",
                  tc: "向下舍入",
                  en: "Round Down",
                },
              },
            ],
            direction: [
              {
                value: 1,
                trans: {
                  "zh-CN": "买",
                  tc: "買",
                  en: "Buy",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "卖",
                  tc: "賣",
                  en: "Sell",
                },
              },
              {
                value: 3,
                trans: {
                  "zh-CN": "买 卖",
                  tc: "買 買",
                  en: "Buy Sell",
                },
              },
            ],
            security_type: [
              {
                value: "ALL",
                trans: {
                  "zh-CN": "全部",
                  tc: "全部",
                  en: "All",
                },
              },
              {
                value: "1",
                trans: {
                  "zh-CN": "股票",
                  tc: "股票",
                  en: "Stocks",
                },
              },
              {
                value: "11",
                trans: {
                  "zh-CN": "窝轮",
                  tc: "窩輪",
                  en: "Warrants",
                },
              },
              {
                value: "12",
                trans: {
                  "zh-CN": "牛熊证",
                  tc: "牛熊證",
                  en: "Bull/Bear Certificates",
                },
              },
              {
                value: "13",
                trans: {
                  "zh-CN": "界内证",
                  tc: "界內證",
                  en: "Intraday Certificates",
                },
              },
              {
                value: "14",
                trans: {
                  "zh-CN": "港股ETF",
                  tc: "港股ETF",
                  en: "HK ETF",
                },
              },
              {
                value: "41",
                trans: {
                  "zh-CN": "美股ETF",
                  tc: "美股ETF",
                  en: "US ETF",
                },
              },
            ],
          },
        },
        direction: [
          {
            value: 1,
            trans: {
              "zh-CN": "买",
              tc: "買",
              en: "Buy",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "卖",
              tc: "賣",
              en: "Sell",
            },
          },
          {
            value: 3,
            trans: {
              "zh-CN": "买卖",
              tc: "買賣",
              en: "Buy/Sell",
            },
          },
        ],
        security_type: [
          {
            value: "ALL",
            trans: {
              "zh-CN": "全部",
              tc: "全部",
              en: "All",
            },
          },
          {
            value: "1",
            trans: {
              "zh-CN": "股票",
              tc: "股票",
              en: "Stocks",
            },
          },
          {
            value: "2",
            trans: {
              "zh-CN": "指数",
              tc: "指數",
              en: "Indices",
            },
          },
          {
            value: "3",
            trans: {
              "zh-CN": "其他",
              tc: "其他",
              en: "Other",
            },
          },
          {
            value: "4",
            trans: {
              "zh-CN": "股指",
              tc: "股指",
              en: "Stock Index",
            },
          },
          {
            value: "5",
            trans: {
              "zh-CN": "私募基金",
              tc: "私募基金",
              en: "Private Equity Fund",
            },
          },
          {
            value: "6",
            trans: {
              "zh-CN": "公募基金",
              tc: "公募基金",
              en: "Public Mutual Fund",
            },
          },
          {
            value: "11",
            trans: {
              "zh-CN": "窝轮",
              tc: "窩輪",
              en: "Warrants",
            },
          },
          {
            value: "12",
            trans: {
              "zh-CN": "牛熊证",
              tc: "牛熊證",
              en: "Bull/Bear Certificates",
            },
          },
          {
            value: "13",
            trans: {
              "zh-CN": "界内证",
              tc: "界內證",
              en: "Intraday Certificates",
            },
          },
          {
            value: "14",
            trans: {
              "zh-CN": "信托",
              tc: "信托",
              en: "Trusts",
            },
          },
          {
            value: "15",
            trans: {
              "zh-CN": "债券",
              tc: "債券",
              en: "Bonds",
            },
          },
          {
            value: "16",
            trans: {
              "zh-CN": "一篮子认沽权证",
              tc: "一籃子認沽權證",
              en: "Basket Put Warrants",
            },
          },
          {
            value: "21",
            trans: {
              "zh-CN": "科创板",
              tc: "科創板",
              en: "STAR Market",
            },
          },
          {
            value: "31",
            trans: {
              "zh-CN": "创业板",
              tc: "創業板",
              en: "ChiNext",
            },
          },
          {
            value: "41",
            trans: {
              "zh-CN": "ETF",
              tc: "ETF",
              en: "ETF",
            },
          },
        ],
      },
    },
    config: {
      inquiry: {
        type: [
          {
            value: 1,
            trans: { "zh-CN": "APP页面", tc: "APP頁面", en: "APP page" },
          },
          { value: 2, trans: { "zh-CN": "文件", tc: "文件", en: "file" } },
        ],
      },
      template: {
        orderSort: {
          status: [
            {
              value: 1,
              trans: {
                "zh-CN": "启用",
                tc: "啟用",
                en: "Enable",
              },
            },
            {
              value: 0,
              trans: {
                "zh-CN": "禁用",
                tc: "禁用",
                en: "Disable",
              },
            },
          ],
        },
        riskControl: [
          { value: 2, trans: { "zh-CN": "2倍", tc: "2倍", en: "2x" } },
          { value: 3, trans: { "zh-CN": "3倍", tc: "3倍", en: "3x" } },
          { value: 4, trans: { "zh-CN": "4倍", tc: "4倍", en: "4x" } },
          { value: 5, trans: { "zh-CN": "5倍", tc: "5倍", en: "5x" } },
          { value: 6, trans: { "zh-CN": "6倍", tc: "6倍", en: "6x" } },
          { value: 7, trans: { "zh-CN": "7倍", tc: "7倍", en: "7x" } },
          { value: 9, trans: { "zh-CN": "15倍", tc: "15倍", en: "15x" } },
        ],
        investmentScope: {
          type: [
            { value: 0, trans: { "zh-CN": "否", tc: "否", en: "no" } },
            { value: 1, trans: { "zh-CN": "是", tc: "是", en: "yes" } },
          ],
        },
      },
      pool: {
        data: [
          {
            value: "0",
            trans: {
              "zh-CN": "非券池中股票可交易",
              tc: "非券池中股票可交易",
              en: "Non-Pool Stocks Tradable",
            },
          },
          {
            value: "1",
            trans: {
              "zh-CN": "仅券池中股票可交易",
              tc: "僅券池中股票可交易",
              en: "Pool Stocks Tradable Only",
            },
          },
        ],
      },
      notice: {
        sms_china_channel: [
          {
            value: "link-china",
            trans: {
              "zh-CN": "LinkSoft通道(大陆)",
              tc: "LinkSoft通道(大陸)",
              en: "LinkSoft Channel (China Mainland)",
            },
          },
          {
            value: "access-china",
            trans: {
              "zh-CN": "AccessYou通道(大陆)",
              tc: "AccessYou通道(大陸)",
              en: "AccessYou Channel (China Mainland)",
            },
          },
          {
            value: "dd-china",
            trans: {
              "zh-CN": "钉钉提醒(大陆)",
              tc: "钉钉提醒(大陸)",
              en: "DingTalk Reminder (China Mainland)",
            },
          },
        ],
        sms_abroad_channel: [
          {
            value: "cl-abroad",
            trans: {
              "zh-CN": "LinkSoft通道(国际)",
              tc: "LinkSoft通道(國際)",
              en: "LinkSoft Channel (International)",
            },
          },
          {
            value: "access-abroad",
            trans: {
              "zh-CN": "AccessYou通道(国际)",
              tc: "AccessYou通道(國際)",
              en: "AccessYou Channel (International)",
            },
          },
          {
            value: "dd-abroad",
            trans: {
              "zh-CN": "钉钉提醒(国际)",
              tc: "钉钉提醒(國際)",
              en: "DingTalk Reminder (International)",
            },
          },
        ],
        push_channel: [
          {
            value: "umeng",
            trans: {
              "zh-CN": "友盟推送",
              tc: "友盟推送",
              en: "Umeng Push",
            },
          },
        ],
      },
    },
    info: {
      page: {
        type: [
          {
            value: 0,
            trans: {
              "zh-CN": "其他",
              tc: "其他",
              en: "other",
            },
          },
          {
            value: 1,
            trans: {
              "zh-CN": "协议相关",
              tc: "協議相關",
              en: "Protocol related",
            },
          },
          {
            value: 2,
            trans: {
              "zh-CN": "行情相关",
              tc: "行情相關",
              en: "Price related",
            },
          },
          {
            value: 3,
            trans: {
              "zh-CN": "市场相关",
              tc: "市場相關",
              en: "Market related",
            },
          },
          {
            value: 4,
            trans: {
              "zh-CN": "出入金相关",
              tc: "出入金相關",
              en: "Related to deposit and withdrawal",
            },
          },
        ],
      },
      platform: [
        {
          value: "PC",
          trans: {
            "zh-CN": "PC",
            tc: "PC",
            en: "PC",
          },
        },
        {
          value: "App",
          trans: {
            "zh-CN": "App",
            tc: "App",
            en: "App",
          },
        },
        {
          value: "Client",
          trans: {
            "zh-CN": "Client",
            tc: "Client",
            en: "Client",
          },
        },
      ],
    },
    cms: {
      help: {
        problem: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "已关闭",
                tc: "已關閉",
                en: "Closed",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已开启",
                tc: "已開啟",
                en: "Open",
              },
            },
          ],
          type: [
            {
              value: 0,
              trans: {
                "zh-CN": "常规",
                tc: "常規",
                en: "General",
              },
            },
          ],
        },
        feedback: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "待处理",
                tc: "待處理",
                en: "Pending",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已查看",
                tc: "已查看",
                en: "Viewed",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "已回复",
                tc: "已回覆",
                en: "Replied",
              },
            },
          ],
        },
      },
      adv: {
        adv: {
          type: [
            {
              value: 1,
              trans: {
                "zh-CN": "发现",
                tc: "發現",
                en: "find",
              },
            },
            // {
            //     "value":9,
            //     "trans": {
            //         "zh-CN": "财富",
            //         "tc": "財富",
            //         "en": "wealth"
            //     },
            // }
          ],
          need: [
            {
              value: 0,
              trans: {
                "zh-CN": "不需要",
                tc: "不需要",
                en: "Not Required",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "需要",
                tc: "需要",
                en: "Required",
              },
            },
          ],
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "停用",
                tc: "停用",
                en: "Disabled",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "开启",
                tc: "開啟",
                en: "Enabled",
              },
            },
          ],
        },
      },
      message: {
        comment: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "待审核",
                tc: "待審核",
                en: "Audit",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "通过",
                tc: "通過",
                en: "passed",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "不通过",
                tc: "不通過",
                en: "Not passed",
              },
            },
          ],
          status1: [
            {
              value: 1,
              trans: {
                "zh-CN": "通过",
                tc: "通過",
                en: "passed",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "不通过",
                tc: "不通過",
                en: "Not passed",
              },
            },
          ],
        },
        feedback: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "待处理",
                tc: "待處理",
                en: "Pending",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已查看",
                tc: "已查看",
                en: "Viewed",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "已回复",
                tc: "已回覆",
                en: "Replied",
              },
            },
          ],
          type: [
            {
              value: 1,
              trans: {
                "zh-CN": "登录/开户",
                tc: "登錄/開戶",
                en: "Login/Open Account",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "入金",
                tc: "入金",
                en: "Deposit",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "行情/自选",
                tc: "行情/自選",
                en: "Market/Watchlist",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "交易/账户",
                tc: "交易/賬戶",
                en: "Trading/Account",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "新闻",
                tc: "新聞",
                en: "News",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "其他",
                tc: "其他",
                en: "Other",
              },
            },
          ],
        },
        affair: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "未读",
                tc: "未讀",
                en: "Unread",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已读",
                tc: "已讀",
                en: "Read",
              },
            },
          ],
          type: [
            {
              value: 1,
              trans: {
                "zh-CN": "销户",
                tc: "銷戶",
                en: "Account Closure",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "更新资料",
                tc: "更新資料",
                en: "Update Information",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "补充资料",
                tc: "補充資料",
                en: "Supplement Information",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "添加柜台银行卡",
                tc: "添加櫃台銀行卡",
                en: "Add Counter Bank Card",
              },
            },
          ],
          type1: [
            {
              value: 1,
              trans: {
                "zh-CN": "销户",
                tc: "銷戶",
                en: "Account Closure",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "更新资料",
                tc: "更新資料",
                en: "Update Information",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "更新资料",
                tc: "更新資料",
                en: "Update Information",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "更新资料",
                tc: "更新資料",
                en: "Update Information",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "补充资料",
                tc: "補充資料",
                en: "Supplement Information",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "添加柜台银行卡",
                tc: "添加櫃台銀行卡",
                en: "Add Counter Bank Card",
              },
            },
          ],
          type2: [
            {
              value: 1,
              trans: {
                "zh-CN": "销户",
                tc: "銷戶",
                en: "Account Closure",
              },
            },
          ],
        },
        message: {
          messageType: [
            {
              value: 1,
              trans: {
                "zh-CN": "个推",
                tc: "個推",
                en: "Personal Push",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "群发",
                tc: "群發",
                en: "Mass Push",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "广播",
                tc: "廣播",
                en: "Broadcast",
              },
            },
          ],
          noticeType: [
            {
              value: 0,
              trans: {
                "zh-CN": "静默",
                tc: "靜默",
                en: "Silent",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "通知",
                tc: "通知",
                en: "Notification",
              },
            },
          ],
          pushType: [
            {
              value: 0,
              trans: {
                "zh-CN": "推送中",
                tc: "推送中",
                en: "Pushing",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "推送成功",
                tc: "推送成功",
                en: "Push Successful",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "推送失败",
                tc: "推送失敗",
                en: "Push Failed",
              },
            },
          ],
        },
      },
      simulate: {
        account: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "委托中",
                tc: "委托中",
                en: "In Progress",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "委托成功",
                tc: "委托成功",
                en: "Success",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "委托失败",
                tc: "委托失败",
                en: "Failure",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "撤单中",
                tc: "撤单中",
                en: "Cancellation in Progress",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "撤单成功",
                tc: "撤单成功",
                en: "Cancellation Successful",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "部分成交",
                tc: "部分成交",
                en: "Partial Fill",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "交易完成",
                tc: "交易完成",
                en: "Trade Complete",
              },
            },
            {
              value: 7,
              trans: {
                "zh-CN": "交易失败",
                tc: "交易失败",
                en: "Trade Failed",
              },
            },
            {
              value: 8,
              trans: {
                "zh-CN": "订单过期",
                tc: "订单过期",
                en: "Order Expired",
              },
            },
            {
              value: 9,
              trans: {
                "zh-CN": "系统撮合",
                tc: "系统撮合",
                en: "System Match",
              },
            },
            {
              value: 10,
              trans: {
                "zh-CN": "部成部撤",
                tc: "部成部撤",
                en: "Partial Fill and Cancel",
              },
            },
          ],
          direction: [
            {
              value: 1,
              trans: {
                "zh-CN": "买入",
                tc: "买入",
                en: "Buy",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "卖出",
                tc: "卖出",
                en: "Sell",
              },
            },
          ],
        },
  
        trade: {
          type: [
            {
              value: 1,
              trans: {
                "zh-CN": "限价单",
                tc: "限价单",
                en: "Limit Order",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "市价单",
                tc: "市价单",
                en: "Market Order",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "增强限价单",
                tc: "增强限价单",
                en: "Enhanced Limit Order",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "竞价市价单",
                tc: "竞价市价单",
                en: "Auction Market Order",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "竞价限价单",
                tc: "竞价限价单",
                en: "Auction Limit Order",
              },
            },
          ],
        },
  
        entrust: {
          expire_type: [
            {
              value: 1,
              trans: {
                "zh-CN": "当日过期",
                tc: "当日过期",
                en: "Day Order",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "30天过期",
                tc: "30天过期",
                en: "30-day Order",
              },
            },
          ],
        },
      },
      asset: {
        movement: {
          direction: [
            {
              value: 1,
              trans: {
                "zh-CN": "转入",
                tc: "轉入",
                en: "Deposit",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "转出",
                tc: "轉出",
                en: "Withdrawal",
              },
            },
          ],
  
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "申请中",
                tc: "申請中",
                en: "Pending",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已确认",
                tc: "已確認",
                en: "Confirmed",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "失败",
                tc: "失敗",
                en: "Failed",
              },
            },
          ],
  
          statusType: [
            {
              value: 1,
              trans: {
                "zh-CN": "已确认",
                tc: "已確認",
                en: "Confirmed",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "失败",
                tc: "失敗",
                en: "Failed",
              },
            },
          ],
        },
        payment: {
          type: [
            {
              value: 2,
              trans: {
                "zh-CN": "网银汇款",
                tc: "網銀匯款",
                en: "Online Bank Transfer",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "FPS转数快",
                tc: "FPS轉數快",
                en: "FPS Instant Transfer",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "eDDA 快捷入金",
                tc: "eDDA 快捷入金",
                en: "eDDA Quick Deposit",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "银证转账",
                tc: "銀證轉賬",
                en: "Securities Transfer",
              },
            },
          ],
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "待审核",
                tc: "待審核",
                en: "Audit",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "待入账",
                tc: "待入賬",
                en: "Pending Deposit",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "待退款",
                tc: "待退款",
                en: "Pending Refund",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "已到账",
                tc: "已到賬",
                en: "Accounted",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "已退款",
                tc: "已退款",
                en: "Refunded",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "拒绝",
                tc: "拒絕",
                en: "Reject",
              },
            },
          ],
  
          status1: [
            {
              value: 0,
              trans: {
                "zh-CN": "待审核",
                tc: "待審核",
                en: "Audit",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "待审核",
                tc: "待審核",
                en: "Audit",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "待入账",
                tc: "待入賬",
                en: "Pending Deposit",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "待退款",
                tc: "待退款",
                en: "Pending Refund",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "已到账",
                tc: "已到賬",
                en: "Accounted",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "已退款",
                tc: "已退款",
                en: "Refunded",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "拒绝",
                tc: "拒絕",
                en: "Reject",
              },
            },
          ],
        },
        withdraw: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "待审核",
                tc: "待審核",
                en: "Audit",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "提现中",
                tc: "提現中",
                en: "Withdrawal in Progress",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "提现成功",
                tc: "提現成功",
                en: "Withdrawal Successful",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "提现失败",
                tc: "提現失敗",
                en: "Withdrawal Failed",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "提现撤销",
                tc: "提現撤銷",
                en: "Withdrawal Cancelled",
              },
            },
          ],
        },
        exchange: {
          status: [
            {
              value: 1,
              trans: {
                "zh-CN": "待审核",
                tc: "待審核",
                en: "Audit",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "兑换成功",
                tc: "兌換成功",
                en: "Redeemed Successfully",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "兑换失败",
                tc: "兌換失敗",
                en: "Redeem Failed",
              },
            },
          ],
        },
      },
      client: {
        client: {
          status: [
            {
              value: 1,
              trans: {
                "zh-CN": "启用",
                tc: "啟用",
                en: "Enabled",
              },
            },
            {
              value: 0,
              trans: {
                "zh-CN": "禁用",
                tc: "禁用",
                en: "Disabled",
              },
            },
          ],
        },
        info: {
          type: [
            {
              value: 2,
              trans: {
                "zh-CN": "手机号码",
                tc: "手機號碼",
                en: "Phone Number",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "邮箱地址",
                tc: "郵箱地址",
                en: "Email Address",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "家庭住址",
                tc: "家庭住址",
                en: "Home Address",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "补充资料",
                tc: "補充資料",
                en: "Additional Information",
              },
            },
          ],
  
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "待审核",
                tc: "待審核",
                en: "Audit",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "审核成功",
                tc: "審核成功",
                en: "Review Successful",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "审核失败",
                tc: "審核失敗",
                en: "Review Failed",
              },
            },
          ],
  
          status1: [
            {
              value: 1,
              trans: {
                "zh-CN": "审核成功",
                tc: "審核成功",
                en: "Review Successful",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "审核失败",
                tc: "審核失敗",
                en: "Review Failed",
              },
            },
          ],
        },
        device: {
          device: [
            {
              value: "Android",
              trans: {
                "zh-CN": "Android",
                tc: "Android",
                en: "Android",
              },
            },
            {
              value: "iOS",
              trans: {
                "zh-CN": "iOS",
                tc: "iOS",
                en: "iOS",
              },
            },
            {
              value: "Windows",
              trans: {
                "zh-CN": "Windows",
                tc: "Windows",
                en: "Windows",
              },
            },
            {
              value: "Mac",
              trans: {
                "zh-CN": "Mac",
                tc: "Mac",
                en: "Mac",
              },
            },
          ],
        },
        destroy: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "犹豫期",
                tc: "猶豫期",
                en: "Cooling-Off Period",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已注销",
                tc: "已注銷",
                en: "Cancelled",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "放弃注销",
                tc: "放棄注銷",
                en: "Cancellation Abandoned",
              },
            },
          ],
          createType: [
            {
              value: 1,
              trans: {
                "zh-CN": "验证手机",
                tc: "驗證手機",
                en: "Verify Phone",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "后台添加",
                tc: "後台添加",
                en: "Backend Addition",
              },
            },
          ],
  
          isOpen: [
            {
              value: 0,
              trans: {
                "zh-CN": "未开户",
                tc: "未開戶",
                en: "Not Opened",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已开户",
                tc: "已開戶",
                en: "Opened",
              },
            },
          ],
  
          sendSms: [
            {
              value: 1,
              trans: {
                "zh-CN": "发送",
                tc: "發送",
                en: "Send",
              },
            },
            {
              value: 0,
              trans: {
                "zh-CN": "不发送",
                tc: "不發送",
                en: "Do Not Send",
              },
            },
          ],
        },
      },
      operate: {
        quote: {
          market: {
            status: [
              {
                value: 1,
                trans: {
                  "zh-CN": "启用",
                  tc: "啟用",
                  en: "Enabled",
                },
              },
              {
                value: 0,
                trans: {
                  "zh-CN": "禁用",
                  tc: "禁用",
                  en: "Disabled",
                },
              },
            ],
  
            marketType: [
              {
                value: "HK",
                trans: {
                  "zh-CN": "港股",
                  tc: "港股",
                  en: "HK",
                },
              },
              {
                value: "US",
                trans: {
                  "zh-CN": "美股",
                  tc: "美股",
                  en: "US",
                },
              },
            ],
  
            quoteLevel: [
              {
                value: 1,
                trans: {
                  "zh-CN": "Lv1",
                  tc: "Lv1",
                  en: "Level 1",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "Lv2",
                  tc: "Lv2",
                  en: "Level 2",
                },
              },
            ],
  
            level: [
              {
                value: 1,
                trans: {
                  "zh-CN": "大陆 App",
                  tc: "大陸 App",
                  en: "Mainland App",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "大陆 全终端",
                  tc: "大陸 全終端",
                  en: "Mainland Full Terminal",
                },
              },
              {
                value: 3,
                trans: {
                  "zh-CN": "全球 全终端",
                  tc: "全球 全終端",
                  en: "Global Full Terminal",
                },
              },
            ],
            levelUS: [
              {
                value: 3,
                trans: {
                  "zh-CN": "全球 全终端",
                  tc: "全球 全終端",
                  en: "Global Full Terminal",
                },
              },
            ],
  
            type: [
              {
                value: 1,
                trans: {
                  "zh-CN": "积分兑换",
                  tc: "積分兌換",
                  en: "Points Redemption",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "激活码兑换",
                  tc: "激活碼兌換",
                  en: "Activation Code Redemption",
                },
              },
              {
                value: 3,
                trans: {
                  "zh-CN": "购买卡券",
                  tc: "購買卡券",
                  en: "Purchase Vouchers",
                },
              },
              {
                value: 4,
                trans: {
                  "zh-CN": "后台赠送",
                  tc: "後台贈送",
                  en: "Backend Gift",
                },
              },
            ],
  
            accessStatus: [
              {
                value: 0,
                trans: {
                  "zh-CN": "待领取",
                  tc: "待領取",
                  en: "Pending",
                },
              },
              {
                value: 1,
                trans: {
                  "zh-CN": "已领取",
                  tc: "已領取",
                  en: "Received",
                },
              },
            ],
          },
          cdkey: {
            status: [
              {
                value: 1,
                trans: {
                  "zh-CN": "已激活",
                  tc: "已激活",
                  en: "Activated",
                },
              },
              {
                value: 0,
                trans: {
                  "zh-CN": "未激活",
                  tc: "未激活",
                  en: "Not Activated",
                },
              },
            ],
          },
        },
        integral: {
          market: {
            type: [
              {
                value: 1,
                trans: {
                  "zh-CN": "行情卡券",
                  tc: "行情卡券",
                  en: "Market Card",
                },
              },
            ],
          },
          task: {
            //   type: [
            //     {
            //       value: 1,
            //       trans: {
            //         "zh-CN": "添加自选",
            //         tc: "添加自選",
            //         en: "Add to Watchlist",
            //       },
            //     },
            //     {
            //       value: 2,
            //       trans: {
            //         "zh-CN": "证券交易",
            //         tc: "證券交易",
            //         en: "Security Trading",
            //       },
            //     },
            //     {
            //       value: 3,
            //       trans: {
            //         "zh-CN": "邀请好友",
            //         tc: "邀請好友",
            //         en: "Invite Friends",
            //       },
            //     },
            //     {
            //       value: 4,
            //       trans: {
            //         "zh-CN": "连续交易",
            //         tc: "連續交易",
            //         en: "Continuous Trading",
            //       },
            //     },
            //     {
            //       value: 5,
            //       trans: {
            //         "zh-CN": "入金",
            //         tc: "入金",
            //         en: "Deposit",
            //       },
            //     },
            //     {
            //       value: 6,
            //       trans: {
            //         "zh-CN": "首次入金",
            //         tc: "首次入金",
            //         en: "First Deposit",
            //       },
            //     },
            //     {
            //       value: 7,
            //       trans: {
            //         "zh-CN": "开户成功",
            //         tc: "開戶成功",
            //         en: "Successful Account Opening",
            //       },
            //     },
            //   ],
            type: [
              {
                value: "add_optional",
                trans: {
                  "zh-CN": "添加自选",
                  tc: "添加自選",
                  en: "Add to Watchlist",
                },
              },
              {
                value: "trade_security",
                trans: {
                  "zh-CN": "证券交易",
                  tc: "證券交易",
                  en: "Security Trading",
                },
              },
              {
                value: "invite_user",
                trans: {
                  "zh-CN": "邀请好友",
                  tc: "邀請好友",
                  en: "Invite Friends",
                },
              },
              {
                value: "total_cash_in",
                trans: {
                  "zh-CN": "累计入金",
                  tc: "累計入金",
                  en: "Total Cash-In",
                },
              },
              {
                value: "first_cash_in",
                trans: {
                  "zh-CN": "首次入金",
                  tc: "首次入金",
                  en: "First Cash-In",
                },
              },
              {
                value: "open_account",
                trans: {
                  "zh-CN": "开户成功",
                  tc: "開戶成功",
                  en: "Successful Account Opening",
                },
              },
            ],
            expire_type: [
              {
                value: 1,
                trans: {
                  "zh-CN": "长期",
                  tc: "長期",
                  en: "Long-term",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "每日",
                  tc: "每日",
                  en: "Daily",
                },
              },
            ],
            status: [
              {
                value: 0,
                trans: {
                  "zh-CN": "下架",
                  tc: "下架",
                  en: "Offline",
                },
              },
              {
                value: 1,
                trans: {
                  "zh-CN": "上架",
                  tc: "上架",
                  en: "Online",
                },
              },
            ],
            is_auto_receive: [
              {
                value: 0,
                trans: {
                  "zh-CN": "否",
                  tc: "否",
                  en: "No",
                },
              },
              {
                value: 1,
                trans: {
                  "zh-CN": "是",
                  tc: "是",
                  en: "Yes",
                },
              },
            ],
          },
        },
        symbol: {
          screener: {
            unit: [
              {
                value: 1,
                trans: {
                  "zh-CN": "",
                  tc: "",
                  en: "",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "%",
                  tc: "%",
                  en: "%",
                },
              },
              {
                value: 3,
                trans: {
                  "zh-CN": "亿",
                  tc: "億",
                  en: "Billion",
                },
              },
              {
                value: 4,
                trans: {
                  "zh-CN": "万",
                  tc: "萬",
                  en: "Ten Thousand",
                },
              },
            ],
            units: [
              {
                value: 1,
                trans: {
                  "zh-CN": "1",
                  tc: "1",
                  en: "1",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "%",
                  tc: "%",
                  en: "%",
                },
              },
              {
                value: 3,
                trans: {
                  "zh-CN": "亿",
                  tc: "億",
                  en: "Billion",
                },
              },
              {
                value: 4,
                trans: {
                  "zh-CN": "万",
                  tc: "萬",
                  en: "Ten Thousand",
                },
              },
            ],
          },
          match: {
            period: [
              {
                value: 1,
                trans: {
                  "zh-CN": "周赛",
                  tc: "週賽",
                  en: "Weekly Competition",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "月赛",
                  tc: "月賽",
                  en: "Monthly Competition",
                },
              },
              {
                value: 0,
                trans: {
                  "zh-CN": "其他",
                  tc: "其他",
                  en: "Other",
                },
              },
            ],
            rewardType: [
              {
                value: 1,
                trans: {
                  "zh-CN": "积分",
                  tc: "積分",
                  en: "Points",
                },
              },
              {
                value: 2,
                trans: {
                  "zh-CN": "实物",
                  tc: "實物",
                  en: "Physical Item",
                },
              },
            ],
          },
        },
      },
      agent: {
        settlement: {
          commissionType: [
            {
              value: 1,
              trans: {
                "zh-CN": "一级交易分佣",
                tc: "一級交易分佣",
                en: "Level 1 Trading Commission",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "一级交易抽佣",
                tc: "一級交易抽佣",
                en: "Level 1 Trading Rebate",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "二级交易分佣",
                tc: "二級交易分佣",
                en: "Level 2 Trading Commission",
              },
            },
          ],
          commissionType2: [
            {
              value: 1,
              trans: {
                "zh-CN": "一级交易分佣",
                tc: "一級交易分佣",
                en: "Level 1 Trading Commission",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "一级交易抽佣",
                tc: "一級交易抽佣",
                en: "Level 1 Trading Rebate",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "二级交易分佣",
                tc: "二級交易分佣",
                en: "Level 2 Trading Commission",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "一级利息分佣",
                tc: "一級利息分佣",
                en: "Level 1 Interest Commission",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "一级利息抽佣",
                tc: "一級利息抽佣",
                en: "Level 1 Interest Rebate",
              },
            },
            {
              value: 6,
              trans: {
                "zh-CN": "二级利息分佣",
                tc: "二級利息分佣",
                en: "Level 2 Interest Commission",
              },
            },
          ],
        },
        withdraw: {
          status: [
            {
              value: 1,
              trans: {
                "zh-CN": "申请中",
                tc: "申請中",
                en: "In Progress",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "已完成",
                tc: "已完成",
                en: "Completed",
              },
            },
          ],
        },
        invite: {
          inviteType: [
            {
              value: 1,
              trans: {
                "zh-CN": "邀请码",
                tc: "邀請碼",
                en: "Invitation Code",
              },
            },
            {
              value: 2,
              trans: {
                "zh-CN": "链接",
                tc: "連結",
                en: "Link",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "二维码",
                tc: "二維碼",
                en: "QR Code",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "后台添加",
                tc: "後台添加",
                en: "Backend Addition",
              },
            },
          ],
          is_open: [
            {
              value: 0,
              trans: {
                "zh-CN": "未开户",
                tc: "未開戶",
                en: "Not Opened",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已开户",
                tc: "已開戶",
                en: "Opened",
              },
            },
          ],
          is_payment: [
            {
              value: 0,
              trans: {
                "zh-CN": "未入金",
                tc: "未入金",
                en: "Not Funded",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "已入金",
                tc: "已入金",
                en: "Funded",
              },
            },
          ],
        },
        channel: {
          status: [
            {
              value: 0,
              trans: {
                "zh-CN": "禁用",
                tc: "禁用",
                en: "Disabled",
              },
            },
            {
              value: 1,
              trans: {
                "zh-CN": "启用",
                tc: "啟用",
                en: "Enabled",
              },
            },
          ],
        },
      },
      bankCard: {
        system: {
          payment_type: [
            {
              value: 2,
              trans: {
                "zh-CN": "网银汇款",
                tc: "網銀匯款",
                en: "Bank Transfer",
              },
            },
            {
              value: 3,
              trans: {
                "zh-CN": "FPS转数快",
                tc: "FPS轉數快",
                en: "FPS Transfer",
              },
            },
            {
              value: 4,
              trans: {
                "zh-CN": "eDDA 快捷入金",
                tc: "eDDA 快捷入金",
                en: "eDDA Quick Deposit",
              },
            },
            {
              value: 5,
              trans: {
                "zh-CN": "银证转账",
                tc: "銀證轉賬",
                en: "Securities Transfer",
              },
            },
          ],
        },
      },
    },
  };
  