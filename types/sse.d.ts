export declare namespace SSE {
  export interface PostConversationChatModelRequest {
    /**
     * 会话id
     */
    conversationId?: string;
    /**
     * 网页url,会和会话id同时存在
     */
    webUrl?: string;
    /**
     * 阅读全文时文章的标题
     */
    title?: string;
    /**
     * 消息的格式,传入的消息是有序的，最后一个是用户的提问
     */
    messages: {
      /**
       * 内容信息，包含markdown格式
       */
      content?: string;
      /**
       * 内容的类型，整体上分为三类：文本，快捷操作，阅读全文,摘要及可能问到的问题,带有来源的信息
       */
      contentType:
        | 'text'
        | 'intent'
        | 'read_article'
        | 'reply_summary'
        | 'reply_source'
        | 'welcome'
        | 'read_doc'
        | 'doc_link'
        | 'reply_doc_source'
        | ''
        | ''
        | '';
      /**
       * 会话的唯一标识
       */
      conversationId?: string;
      /**
       * 创建时间
       */
      createTime?: string;
      /**
       * 快捷操作的id，即选中文本的id,一个快捷操作有相同id，当contentType为快捷操作时才会有值
       */
      intentId?: string;
      /**
       * message的唯一标识，前端产生的由前端产生，可以使用uuid,保证会话唯一
       */
      messageId: string;
      /**
       * 父的messageId
       */
      parentMessageId?: string;
      /**
       * 角色信息
       */
      role: 'user' | 'assistant';
      /**
       * message的类型,即文本或者图文
       */
      type?: 'text';
      /**
       * 阅读全文的任务id,这和content 两个必填一个
       */
      taskId?: string;
      /**
       * 文档id
       */
      docId?: string;
    }[];
    /**
     * 选择回复的语言
     */
    language: 'Chinese' | 'English' | 'Auto';
    /**
     * 父的messageId 这里是再次回答可以
     */
    parentMessageId?: string;
    /**
     * 模型名称
     */
    model: string;
  }
}
