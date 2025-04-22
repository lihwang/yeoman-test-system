/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ExerciseStepsType {
  exerciseStepId: number;
  stepDesc: string;
  stepOrder: number;
}

export interface ExerciseType {
  exerciseId: number;
  exerciseType: string;
  exerciseCode: string;
  exerciseStem: string;
  labels?: {
    labelId: string;
    labelName: string;
  }[];
  createTime: string;
  updateTime: string;
  courseName: string;
  courseId: number;
}

export interface Response {
  code: string;
  msg: string;
  data?: string;
}

export interface QuestionType {
  questionId: number;
  /** 题目编号 */
  questionCode: string;
  /** 题目类型 */
  questionType: string;
  /** 课程id */
  courseId: string;
  /** 课程名称 */
  courseName: string;
  labels: {
    labelId: number;
    labelName: string;
  }[];
  createTime: string;
  updateTime: string;
}

export interface TeacherType {
  teacherId?: number;
  realName?: string;
  userName?: string;
  courses?: string;
  majors?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title 学员计算机应用能力智能综合考测平台
 * @version 1.0.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  sgks = {
    /**
     * No description
     *
     * @name MgtLoginCreate
     * @summary 学员登录
     * @request POST:/sgks/mgt/login
     */
    mgtLoginCreate: (
      body: {
        username: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            studentId: number;
            studentName: string;
            studentNo: string;
            /** 所在的班级id */
            classId: number;
            token: string;
          };
        },
        any
      >({
        path: `/sgks/mgt/login`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MgtLogOutList
     * @summary 教师端登出
     * @request GET:/sgks/mgt/logOut
     */
    mgtLogOutList: (params: RequestParams = {}) =>
      this.request<
        {
          code: string;
          msg: string;
          data: string;
        },
        any
      >({
        path: `/sgks/mgt/logOut`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TeacherListCreate
     * @summary 查看教师列表
     * @request POST:/sgks/teacher/list
     */
    teacherListCreate: (
      body: {
        realName?: string;
        /** 课程集合 */
        courseList?: number[];
        /** 专业集合 */
        majorList?: number[];
        pageNo: number;
        pageSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          msg: string;
          code: string;
          data: {
            totalCount: number;
            pageSize: number;
            pageCount: number;
            records: {
              teacherId?: number;
              realName?: string;
              userName?: string;
              courses?: string;
              majors?: string;
            }[];
            pageNo: number;
          };
        },
        any
      >({
        path: `/sgks/teacher/list`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TeacherAddOrEditCreate
     * @summary 新增&编辑教师
     * @request POST:/sgks/teacher/addOrEdit
     */
    teacherAddOrEditCreate: (
      body: {
        teacherId?: number;
        userName: string;
        tealName: string;
        teacherPass: string;
        /** 所教课程集合 */
        courseIds: number[];
        /** 所教专业集合 */
        majorIds: number[];
        /** 所教班级集合 */
        classIds: number[];
        /**
         * 操作类型
         * 1：新增，2：编辑
         */
        opt: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          /** 教师id */
          data: number;
        },
        any
      >({
        path: `/sgks/teacher/addOrEdit`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TeacherGetList
     * @summary 查看教师详情
     * @request GET:/sgks/teacher/get
     */
    teacherGetList: (
      query?: {
        /** 教师id */
        teacherId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            teacherId: string;
            teacherUserName: string;
            teacherRealName: string;
            courses: number[];
            majors: number[];
            classes: number[];
          };
        },
        any
      >({
        path: `/sgks/teacher/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TeacherAbleCreate
     * @summary 教师启用or禁用
     * @request POST:/sgks/teacher/able
     */
    teacherAbleCreate: (
      body: {
        /** 教师id */
        teacherId: number;
        /** 1：启用，0：禁用 */
        able: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data?: any;
        },
        any
      >({
        path: `/sgks/teacher/able`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CourseAllList
     * @summary 获取所有课程的列表
     * @request GET:/sgks/course/all
     */
    courseAllList: (params: RequestParams = {}) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            courseId: number;
            courseName: string;
          }[];
        },
        any
      >({
        path: `/sgks/course/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MajorAllList
     * @summary 获取所有专业的列表
     * @request GET:/sgks/major/all
     */
    majorAllList: (params: RequestParams = {}) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            majorId: number;
            majorName: string;
          }[];
        },
        any
      >({
        path: `/sgks/major/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TeacherChangeOwnPassCreate
     * @summary 教师修改自己的密码
     * @request POST:/sgks/teacher/changeOwnPass
     */
    teacherChangeOwnPassCreate: (
      body: {
        oldPass: string;
        newPass: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data?: any;
        },
        {
          code: string;
          msg: string;
          data: string;
        }
      >({
        path: `/sgks/teacher/changeOwnPass`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name LabelListList
     * @summary 查看知识点标签列表
     * @request GET:/sgks/label/list
     */
    labelListList: (
      query?: {
        /** 标签名称 */
        labelName?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            /** 标签id */
            labelId: number;
            /** 标签名称 */
            labelName: string;
          }[];
        },
        any
      >({
        path: `/sgks/label/list`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name LabelAddOrEditCreate
     * @summary 新增or编辑知识点标签
     * @request POST:/sgks/label/addOrEdit
     */
    labelAddOrEditCreate: (
      body: {
        labelId?: number;
        /** 标签名称 */
        labelName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: string;
        },
        any
      >({
        path: `/sgks/label/addOrEdit`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name LabelAbleCreate
     * @summary 启用or停用知识点标签
     * @request POST:/sgks/label/able
     */
    labelAbleCreate: (
      body: {
        labelId: number;
        /** 1：启用，0：停用 */
        able: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: string;
        },
        any
      >({
        path: `/sgks/label/able`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name QuestionListCreate
     * @summary 查看客观题列表
     * @request POST:/sgks/question/list
     */
    questionListCreate: (
      body: {
        /** 客观题类型 */
        questionType?: number;
        /** 所属课程 */
        courseId?: number;
        /** 题干 */
        questionStem?: string;
        /** 标签id集合 */
        labelIds?: number[];
        pageNo: number;
        pageSize: number;
        questionStatus: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            questionId: number;
            /** 题目编号 */
            questionCode: string;
            /** 题目类型 */
            questionType: string;
            /** 课程id */
            courseId: string;
            /** 课程名称 */
            courseName: string;
            labels: {
              labelId: number;
              labelName: string;
            }[];
            createTime: string;
            updateTime: string;
          }[];
        },
        any
      >({
        path: `/sgks/question/list`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name QuestionAddOrEditCreate
     * @summary 添加or编辑客观题
     * @request POST:/sgks/question/addOrEdit
     */
    questionAddOrEditCreate: (
      body: {
        questionId?: number;
        /** 题目标号 */
        questionCode: string;
        /**
         * 客观题类型
         * 题目类型，1：填空题，2：选择题，3：判断题，4：问答题
         */
        questionType: number;
        /** 题干 */
        questionStem: string;
        /**
         * 操作类型
         * 1：新增，2：编辑
         */
        opt: number;
        /** 所属课程id */
        courseId: number;
        /**
         * 填空题和问答题答案
         * 逗号隔开
         */
        answerContent: string;
        /** 判断题答案 */
        answerTf: number;
        /** 选择题答案 */
        answerChoice: string;
        labelIds: {
          labelId: number;
        }[];
        options: {
          /** abcd */
          optionSign: string;
          /** 选项内容 */
          optionContent: string;
          optionId: number;
        }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: number;
        },
        any
      >({
        path: `/sgks/question/addOrEdit`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name QuestionGetList
     * @summary 查看客观题详情
     * @request GET:/sgks/question/get
     */
    questionGetList: (
      query?: {
        questionId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: object;
        },
        any
      >({
        path: `/sgks/question/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ExerciseListCreate
     * @summary 查看操作题列表
     * @request POST:/sgks/exercise/list
     */
    exerciseListCreate: (
      body: {
        /** 操作题类型 */
        exerciseType?: number;
        /** 课程id */
        courseId?: number;
        labelIds?: number[];
        exerciseCode?: string;
        pageNo: number;
        pageSize: number;
        exerciseStatus: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            exerciseId: number;
            exerciseType: string;
            exerciseCode: string;
            exerciseInfo: string;
            labels?: {
              labelId: string;
              labelName: string;
            }[];
            createTime: string;
            updateTime: string;
            courseName: string;
            courseId: number;
            exerciseSource: number;
            exerciseStatus: number;
          }[];
        },
        any
      >({
        path: `/sgks/exercise/list`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ExerciseAddOrEditCreate
     * @summary 新增or编辑操作题
     * @request POST:/sgks/exercise/addOrEdit
     */
    exerciseAddOrEditCreate: (
      body: {
        exerciseId: number;
        /** 操作题类型 */
        exerciseType: number;
        /** 操作题编码 */
        exerciseCode: string;
        /** 所属课程id */
        courseId: number;
        /** 题目标题(富文本） */
        exerciseInfo: string;
        /** 解题提示 */
        exercisePrompt: string;
        /** 知识点标签 */
        labelIds: number[];
        exerciseSteps: {
          exerciseStepId: number;
          stepDesc: string;
          stepOrder: number;
          /** 富文本补充说明 */
          stepRichText: string;
          knowledges: {
            knowledgeId: string;
            knowledgeOrder: number;
            parameterValues: {
              parameterIndex: number;
              parameterValue: string;
            }[];
          }[];
        }[];
        /**
         * 字处理、电子表格、演示文稿的原始素材
         * 存的是url
         */
        exerciseRawFile: string;
        /**
         * 答案文件
         * 存的是url
         */
        exerciseAnswer: string;
        opt: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          /** 操作题id */
          data: number;
        },
        any
      >({
        path: `/sgks/exercise/addOrEdit`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ExerciseGetList
     * @summary 查看操作题详情
     * @request GET:/sgks/exercise/get
     */
    exerciseGetList: (
      query?: {
        exerciseId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            exerciseId: number;
            /**
             * 操作题类型
             * 1：基本操作，2：字处理，3：电子表格，4：演示文稿
             */
            exerciseType: number;
            /** 操作题编码 */
            exerciseCode: string;
            /** 所属课程id */
            courseId: number;
            /** 所属课程名称 */
            courseName: string;
            /** 解题提示 */
            exercisePrompt: string;
            /**
             * 答案文件
             * word、Excel、ppt操作题的正确答案
             */
            attachment: string;
            /** 操作题知识点标签集合 */
            labels: {
              labelId: number;
              labelName: string;
            }[];
            /**
             * 子题目集合
             * 操作题每一步要做的内容
             */
            exerciseSteps: {
              exerciseStepId: number;
              stepDesc: string;
              stepOrder: string;
            }[];
          };
        },
        any
      >({
        path: `/sgks/exercise/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name QuestionDeleteDelete
     * @summary 删除客观题
     * @request DELETE:/sgks/question/delete
     */
    questionDeleteDelete: (
      query?: {
        questionId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data?: any;
        },
        any
      >({
        path: `/sgks/question/delete`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ExerciseDeleteList
     * @summary 删除操作题
     * @request GET:/sgks/exercise/delete
     */
    exerciseDeleteList: (
      query?: {
        exerciseId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data?: any;
        },
        any
      >({
        path: `/sgks/exercise/delete`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ClassListCreate
     * @summary 查看班级列表
     * @request POST:/sgks/class/list
     */
    classListCreate: (
      body: {
        /** 年级 */
        classGrade?: number;
        /** 专业 */
        majorId?: number;
        /** 队伍号 */
        classTeam?: number;
        /** 区队号 */
        classUnit?: number;
        pageSize: number;
        pageNo: number;
        classStatus: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          msg: string;
          code: string;
          data: {
            totalCount: number;
            pageSize: number;
            pageCount?: any;
            records: {
              classId: number;
              classGrade?: any;
              classTeam: number;
              classUnit: number;
              majorId: number;
              majorName: string;
            }[];
            pageNo?: any;
          };
        },
        any
      >({
        path: `/sgks/class/list`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ClassAddOrEditCreate
     * @summary 新增or编辑 班级
     * @request POST:/sgks/class/addOrEdit
     */
    classAddOrEditCreate: (
      body: {
        classId?: number;
        /** 年级 */
        classGrade: number;
        /** 队别号 */
        classTeam: number;
        /** 区队号 */
        classUnit: number;
        /** 专业id */
        majorId: number;
        opt: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        {
          message: string;
        }
      >({
        path: `/sgks/class/addOrEdit`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name ClassGetList
     * @summary 查看班级详情
     * @request GET:/sgks/class/get
     */
    classGetList: (
      query?: {
        classId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          codee: string;
          msg: string;
          data: {
            classId: number;
            /** 年级 */
            classGrade: number;
            /** 对别号 */
            classTeam: number;
            /** 区队号 */
            classUnit: number;
            /** 专业id */
            majorId: number;
            /** 专业名称 */
            majorName: string;
            createTime: string;
            updateTime: string;
          };
        },
        any
      >({
        path: `/sgks/class/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ClassDeleteDelete
     * @summary 删除班级
     * @request DELETE:/sgks/class/delete
     */
    classDeleteDelete: (
      query?: {
        classId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data?: any;
        },
        any
      >({
        path: `/sgks/class/delete`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name StudentListCreate
     * @summary 查看学员列表
     * @request POST:/sgks/student/list
     */
    studentListCreate: (
      body: {
        studentName?: string;
        studentNo?: string;
        classGrade?: number;
        classTeam?: number;
        classUnit?: number;
        majorId?: number;
        pageNo: number;
        pageSize: number;
        studentStatus: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            studentId: number;
            studentNo: string;
            studentName: string;
            classGrade: number;
            classTeam: number;
            classUnit: number;
            majorId: string;
            majorName: string;
          }[];
        },
        any
      >({
        path: `/sgks/student/list`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name StudentAddOrEditCreate
     * @summary 新建or编辑学员
     * @request POST:/sgks/student/addOrEdit
     */
    studentAddOrEditCreate: (
      body: {
        studentId?: number;
        studentName: string;
        /** 班级id */
        classId: number;
        opt: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data?: any;
        },
        any
      >({
        path: `/sgks/student/addOrEdit`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name StudentGetList
     * @summary 查看学员详情
     * @request GET:/sgks/student/get
     */
    studentGetList: (
      query?: {
        studentId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            studentId: number;
            studentName: string;
            classGrade: number;
            classTeam: number;
            classUnit: number;
            majorId: number;
            majorName: string;
            createTime: string;
            updateTime: string;
          };
        },
        any
      >({
        path: `/sgks/student/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name StudentGetExamResultsList
     * @summary 查看学员的考试记录
     * @request GET:/sgks/student/getExamResults
     */
    studentGetExamResultsList: (
      query?: {
        studentId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            examId: string;
            examName: string;
            realStartTime: string;
            realEndTime: string;
            /** 填空题得分 */
            fbQuestionScore?: number;
            /** 选择题得分 */
            mcQuestionScore?: number;
            /** 判断题得分 */
            tfQuestionScore?: number;
            /** 问答题得分 */
            qaQuestionScore?: number;
            /** 基本操作题得分 */
            basicExerciseScore?: number;
            /** 字处理操作题得分 */
            wordExerciseScore?: number;
            /** 电子表格操作题得分 */
            excelExerciseScore?: number;
            /** 演示文稿操作题得分 */
            pptExerciseScore?: number;
            /** 总分 */
            totalScore: number;
          }[];
        },
        any
      >({
        path: `/sgks/student/getExamResults`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name StudentDeleteDelete
     * @summary 删除学员
     * @request DELETE:/sgks/student/delete
     */
    studentDeleteDelete: (
      query?: {
        studentId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data?: any;
        },
        any
      >({
        path: `/sgks/student/delete`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GradeListList
     * @summary 查看年级列表
     * @request GET:/sgks/grade/list
     */
    gradeListList: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/sgks/grade/list`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MajorListList
     * @summary 查看专业列表
     * @request GET:/sgks/major/list
     */
    majorListList: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/sgks/major/list`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ClassTeamListList
     * @summary 根据年级获取队伍列表
     * @request GET:/sgks/class/teamList
     */
    classTeamListList: (
      query?: {
        grade?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: number[];
        },
        {
          code: string;
          msg: string;
          data: string;
        }
      >({
        path: `/sgks/class/teamList`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ClassUnitListList
     * @summary 根据年级和队伍号获取区队列表
     * @request GET:/sgks/class/unitList
     */
    classUnitListList: (
      query?: {
        grade?: number;
        classTeam?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: number[];
        },
        {
          code: string;
          msg: string;
          data: string;
        }
      >({
        path: `/sgks/class/unitList`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ClassGetByIdsCreate
     * @summary 批量查看班级详情
     * @request POST:/sgks/class/getByIds
     */
    classGetByIdsCreate: (
      body: {
        classIds: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: object[];
        },
        {
          code: string;
          msg: string;
          data: string;
        }
      >({
        path: `/sgks/class/getByIds`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PaperListList
     * @summary 查看试卷列表
     * @request GET:/sgks/paper/list
     */
    paperListList: (
      query?: {
        /** 试卷名 */
        name?: string;
        /** 课程 id */
        courseId?: number;
        /** 页号 */
        pageNo?: number;
        /** 页大小 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            /** 试卷id */
            id: string;
            /** 试卷名称 */
            name: string;
            /** 客观题数量 */
            questionCount: string;
            /** 操作题数量 */
            exerciseCount: string;
            /** 总分 */
            score: number;
            /** 创建时间 */
            createTime: string;
            /** 更新时间 */
            updateTime: string;
            /** 课程 */
            course: {
              /** 课程id */
              courseId: number;
              /** 课程名称 */
              courseName: string;
            };
          }[];
        },
        any
      >({
        path: `/sgks/paper/list`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PaperCreateCreate
     * @summary 创建试卷
     * @request POST:/sgks/paper/create
     */
    paperCreateCreate: (
      body: {
        name: string;
        courceId: number;
        /** 客观题 */
        questions: {
          /** 客观题 id */
          id: number;
          /** 排序 */
          sort: number;
          /** 分数 */
          score: number;
        }[];
        /** 操作题 */
        exercises: {
          /** 操作题id */
          id: number;
          /** 操作步骤id */
          exerciseStepId: number;
          /** 排序 */
          sort: number;
          /** 分数 */
          score: number;
        }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: number;
        },
        any
      >({
        path: `/sgks/paper/create`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PaperDetailList
     * @summary 查看试卷详情
     * @request GET:/sgks/paper/detail
     */
    paperDetailList: (
      query?: {
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            id: number;
            name: string;
            course: {
              /** 课程名称 */
              courseName: string;
              /** 课程id */
              courseId: number;
            };
            /** 总分 */
            score: number;
            questions: {
              questionId: string;
              questionCode: string;
              questionType: number;
              questionStem: string;
              answerContent: string;
              answerTf: string;
              answerChoice: string;
              options: {
                opionId: number;
                opionSgin: string;
                opionContent: string;
              }[];
              labels: {
                labelId: number;
                labelName: string;
              }[];
            }[];
            exercises: {
              exerciseId: number;
              exerciseType: number;
              exerciseCode: string;
              exercisePrompt: string;
              attachment: string;
              answerShell: string;
              steps: {
                exerciseStepId: number;
                stepDesc: string;
                stepOrder: string;
              }[];
              labels: {
                labelId: number;
                labelName: string;
              }[];
            }[];
          };
        },
        any
      >({
        path: `/sgks/paper/detail`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PaperRemoveCreate
     * @summary 删除试卷
     * @request POST:/sgks/paper/remove
     */
    paperRemoveCreate: (
      query?: {
        /** 试卷id */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: object;
        },
        any
      >({
        path: `/sgks/paper/remove`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PaperUpdateCreate
     * @summary 更新试卷
     * @request POST:/sgks/paper/update
     */
    paperUpdateCreate: (
      body: {
        /** 试卷 id */
        id: number;
        name: string;
        courceId: number;
        /** 客观题 */
        questions: {
          /** 客观题 id */
          id: number;
          /** 排序 */
          sort: number;
          /** 分数 */
          score: number;
        }[];
        /** 操作题 */
        exercises: {
          /** 操作题id */
          id: number;
          /** 操作步骤id */
          exerciseStepId: number;
          /** 排序 */
          sort: number;
          /** 分数 */
          score: number;
        }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: number;
        },
        any
      >({
        path: `/sgks/paper/update`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ExamListList
     * @summary 考试记录列表
     * @request GET:/sgks/exam/list
     */
    examListList: (
      query?: {
        /** @example "年级" */
        grade?: number;
        /** @example "队号" */
        team?: number;
        /** @example "区队" */
        unit?: number;
        /** @example "考试开始时间-开始" */
        startTimeStart?: string;
        /** @example "考试开始时间-结束" */
        startTimeEnd?: string;
        /** @example "页号" */
        pageNo?: number;
        /** @example "页大小" */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            /** 考试 id */
            id: number;
            /** 考试名称 */
            name: string;
            /** 试卷id */
            paperId: number;
            /** 试卷名称 */
            paperName: string;
            /** 班级 id */
            classId: number;
            /** 年级 */
            grade: number;
            /** 队号 */
            team: string;
            /** 区队号 */
            unit: string;
            /** 考试时长(单位分钟) */
            duration: string;
            /** 实际开始时间 */
            realStartTime: string;
            /** 剩余分钟 */
            remainMinutes: number;
            /** 剩余秒数 */
            remainSeconds: number;
            /** 待开始、进行中、结束 */
            statusStr: string;
          }[];
        },
        {
          code: string;
          msg: string;
          data: string;
        }
      >({
        path: `/sgks/exam/list`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ExamCreateCreate
     * @summary 创建考试
     * @request POST:/sgks/exam/create
     */
    examCreateCreate: (
      body: {
        /** 名称 */
        name: string;
        /** 班级 */
        classId: number;
        /** 试卷id */
        paperId: number;
        /** 课程id */
        courseId: number;
        /** 计划开始时间 */
        planStartTime: string;
        /** 考试时长 */
        duration: number;
        /** 老师Id */
        teacherId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          "": string;
          /** 错误码 */
          code: number;
          /** 错误信息 */
          msg: number;
          /** 考试 id */
          data: number;
        },
        {
          code: string;
          msg: string;
          data: string;
        }
      >({
        path: `/sgks/exam/create`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ExamDeleteCreate
     * @summary 删除考试
     * @request POST:/sgks/exam/delete
     */
    examDeleteCreate: (
      query?: {
        /** 考试 id */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          "": string;
          /** 错误码 */
          code: number;
          /** 错误信息 */
          msg: number;
          data: boolean;
        },
        {
          code: string;
          msg: string;
          data: string;
        }
      >({
        path: `/sgks/exam/delete`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ExamStopCreate
     * @summary 结束考试
     * @request POST:/sgks/exam/stop
     */
    examStopCreate: (
      query?: {
        /** 考试 id */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          "": string;
          /** 错误码 */
          code: number;
          /** 错误信息 */
          msg: number;
          data: boolean;
        },
        {
          code: string;
          msg: string;
          data: string;
        }
      >({
        path: `/sgks/exam/stop`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ExamStartCreate
     * @summary 开始考试
     * @request POST:/sgks/exam/start
     */
    examStartCreate: (
      query?: {
        /** 考试 id */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          "": string;
          /** 错误码 */
          code: number;
          /** 错误信息 */
          msg: number;
          data: boolean;
        },
        {
          code: string;
          msg: string;
          data: string;
        }
      >({
        path: `/sgks/exam/start`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ExamDetailList
     * @summary 考试详情
     * @request GET:/sgks/exam/detail
     */
    examDetailList: (
      query?: {
        /** 考试 id */
        id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          "": string;
          /** 错误码 */
          code: number;
          /** 错误信息 */
          msg: number;
          /** 考试 id */
          data: {
            /** 考试 id */
            id: number;
            /** 考试名称 */
            name: string;
            /** 年级 */
            grade: string;
            /** 队号 */
            team: string;
            /** 区队号 */
            unit: string;
            /** 计划开始时间 */
            planStartTime: string;
            /** 实际开始时间 */
            realStartTime: string;
            /** 考试时长 */
            duraion: number;
            /** 老师 id */
            teacherId: number;
            /** 老师名称 */
            teacherName: string;
            /** 真实结束时间 */
            realEndTime: string;
            /** 待开始、进行中、已结束 */
            statusStr: string;
          };
        },
        {
          code: string;
          msg: string;
          data: string;
        }
      >({
        path: `/sgks/exam/detail`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name RecommendQuestionListCreate
     * @summary 学员客观题推荐列表
     * @request POST:/sgks/recommend/question/list
     */
    recommendQuestionListCreate: (
      body: {
        studentNo?: string;
        studentName?: string;
        questionType?: number;
        courseId?: number;
        pageSize: number;
        pageNo: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            studentId: number;
            studentNo: string;
            questionId: number;
            questionType: number;
            labels: {
              labelId: number;
              labelName: string;
            }[];
            courseId: number;
            courseName: string;
          }[];
        },
        any
      >({
        path: `/sgks/recommend/question/list`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name RecommendQuesionDeleteDelete
     * @summary 删除客观题推荐题
     * @request DELETE:/sgks/recommend/quesion/delete
     */
    recommendQuesionDeleteDelete: (
      body: {
        studentId: number;
        questionId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data?: any;
        },
        any
      >({
        path: `/sgks/recommend/quesion/delete`,
        method: "DELETE",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name RecommendExerciseListCreate
     * @summary 学员操作题推荐列表
     * @request POST:/sgks/recommend/exercise/list
     */
    recommendExerciseListCreate: (
      body: {
        studentNo?: string;
        studentName?: string;
        exerciseType?: number;
        courseId?: number;
        pageNo: number;
        pageSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            studentId: string;
            studentNo: string;
            exerciseType: number;
            courseId: number;
            courseName: string;
            labels: {
              labelId: number;
              labelName: string;
            }[];
          }[];
        },
        any
      >({
        path: `/sgks/recommend/exercise/list`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name RecommendExerciseDeleteDelete
     * @summary 删除操作题推荐题
     * @request DELETE:/sgks/recommend/exercise/delete
     */
    recommendExerciseDeleteDelete: (
      body: {
        studentId: number;
        exerciseId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data?: any;
        },
        any
      >({
        path: `/sgks/recommend/exercise/delete`,
        method: "DELETE",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name StudentMyInfoList
     * @summary 查看学员自己的基本信息
     * @request GET:/sgks/student/myInfo
     */
    studentMyInfoList: (params: RequestParams = {}) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            studentId: number;
            studentNo: string;
            classGrade: number;
            classTeam: number;
            classUnit: number;
            majorId: number;
            majorName: string;
          };
        },
        any
      >({
        path: `/sgks/student/myInfo`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name FrontExamInfoList
     * @summary 查看考试信息
     * @request GET:/sgks/front/examInfo
     */
    frontExamInfoList: (params: RequestParams = {}) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            examId: string;
            paperId: string;
            paperName: string;
            /** 题型+题目数 */
            qt: {
              /** 题型名称 */
              qtType: string;
              /** 题目数 */
              qtCount: string;
            }[];
            notice: string;
            /** 考试时长 */
            timeLimit: number;
          };
        },
        any
      >({
        path: `/sgks/front/examInfo`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
