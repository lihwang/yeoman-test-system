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
  stepOrder: string;
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
     * @tags 教师端/基本功能
     * @name MgtLoginCreate
     * @summary 教师端登录
     * @request POST:/sgks/mgt/login
     */
    mgtLoginCreate: (
      data: {
        username: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          data: {
            roleCodes: string[];
            token: string;
            username: string;
          };
        },
        any
      >({
        path: `/sgks/mgt/login`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/基本功能
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
     * @tags 教师端/基本功能
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
     * @tags 教师端/基本功能
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
     * @tags 教师端/基本功能
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
     * @tags 教师端/基本功能
     * @name TeacherAbleDelete
     * @summary 教师启用or禁用
     * @request DELETE:/sgks/teacher/able
     */
    teacherAbleDelete: (
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
        method: "DELETE",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/基本功能
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
     * @tags 教师端/基本功能
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
     * @tags 教师端/题库管理
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
     * @tags 教师端/题库管理
     * @name LableAddOrEditCreate
     * @summary 新增or编辑知识点标签
     * @request POST:/sgks/lable/addOrEdit
     */
    lableAddOrEditCreate: (
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
        path: `/sgks/lable/addOrEdit`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/题库管理
     * @name LableAbleCreate
     * @summary 启用or停用知识点标签
     * @request POST:/sgks/lable/able
     */
    lableAbleCreate: (
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
        path: `/sgks/lable/able`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/题库管理
     * @name QuestionListList
     * @summary 查看客观题列表
     * @request GET:/sgks/question/list
     */
    questionListList: (
      body: {
        /** 客观题类型 */
        questionType?: number;
        /** 所属课程 */
        courseId?: number;
        /** 题干 */
        questionStem?: string;
        /** 标签id集合 */
        labels?: number[];
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
        method: "GET",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/题库管理
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
          opionSgin: string;
          /** 选项内容 */
          opionContent: string;
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
     * @tags 教师端/题库管理
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
     * @tags 教师端/题库管理
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
        /** 题干 */
        exerciseStem?: string;
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
     * @tags 教师端/题库管理
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
        /** 题干 */
        exerciseStem: string;
        /** 解题提示 */
        exercisePrompt: string;
        /**
         * 答案文件
         * 字处理、电子表格、演示文稿的答案文件，oss路径
         */
        attachment: string;
        /**
         * 答案脚本
         * 用户在学员电脑上生产正确文件夹和文件的Windows shell脚本，基本操作题的正确答案
         */
        answerShell: string;
        /** 知识点标签 */
        labelIds: number[];
        exerciseSteps: ExerciseStepsType[];
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
     * @tags 教师端/题库管理
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
     * @tags 教师端/题库管理
     * @name QuesionDeleteDelete
     * @summary 删除客观题
     * @request DELETE:/sgks/quesion/delete
     */
    quesionDeleteDelete: (
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
        path: `/sgks/quesion/delete`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/题库管理
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
     * @tags 教师端/学员管理
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
            classId: number;
            /** 年级 */
            classGrade: number;
            /** 队别号 */
            classTeam: number;
            /** 区队号 */
            classUnit: number;
            /** 专业id */
            majorId: number;
            /** 专业名称 */
            majorName: string;
          }[];
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
     * @tags 教师端/学员管理
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
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          /** 班级id */
          data: number;
        },
        any
      >({
        path: `/sgks/class/addOrEdit`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/学员管理
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
     * @tags 教师端/学员管理
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
     * @tags 教师端/学员管理
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
     * @tags 教师端/学员管理
     * @name StudentAddOrEditCreate
     * @summary 新建or编辑学员
     * @request POST:/sgks/student/addOrEdit
     */
    studentAddOrEditCreate: (
      body: {
        studentId?: number;
        studentName?: string;
        /**
         * 班级id
         * 班级=年级+队别+区队+专业
         */
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
     * @tags 教师端/学员管理
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
     * @tags 教师端/学员管理
     * @name StudentGetExamResultsList
     * @summary 查看需要的考试记录
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
            realStartTime: string;
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
     * @tags 教师端/学员管理
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
     * @tags 教师端/学员管理
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
     * @tags 教师端/学员管理
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
     * @tags 教师端/学员管理
     * @name ClassTreeList
     * @summary 班级树
     * @request GET:/sgks/class/tree
     */
    classTreeList: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/sgks/class/tree`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/试卷管理
     * @name PaperListCreate
     * @summary 查看试卷列表
     * @request POST:/sgks/paper/list
     */
    paperListCreate: (
      body: {
        paperName?: string;
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
            paperId: string;
            /** 试卷名称 */
            paperName: string;
            /** 所属课程id */
            courseId: string;
            /** 所属课程名称 */
            courseName: string;
            /** 客观题数量 */
            questionCount: string;
            /** 操作题数量 */
            exerciseCount: string;
            /** 总分 */
            totalScore: string;
            createTime: string;
            updateTime: string;
          }[];
        },
        any
      >({
        path: `/sgks/paper/list`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/试卷管理
     * @name PaperAddOrEditCreate
     * @summary 新增or编辑试卷
     * @request POST:/sgks/paper/addOrEdit
     */
    paperAddOrEditCreate: (
      body: {
        paperId: string;
        paperName: string;
        /** 客观题id集合 */
        questionIds: number[];
        /** 操作题id集合 */
        exerciseIds: number[];
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
        path: `/sgks/paper/addOrEdit`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/试卷管理
     * @name PaperGetList
     * @summary 查看试卷详情
     * @request GET:/sgks/paper/get
     */
    paperGetList: (
      query?: {
        paperId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: string;
          msg: string;
          data: {
            paperId: number;
            paperName: string;
            /** 课程id */
            courseId: number;
            /** 课程名称 */
            courseName: string;
            /** 总分 */
            totalScore: number;
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
              labels: object[];
            }[];
          };
        },
        any
      >({
        path: `/sgks/paper/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/试卷管理
     * @name PaperDeleteDelete
     * @summary 删除试卷
     * @request DELETE:/sgks/paper/delete
     */
    paperDeleteDelete: (
      query?: {
        paperId?: number;
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
        path: `/sgks/paper/delete`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 教师端/智能推荐
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
            questionStem: string;
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
     * @tags 教师端/智能推荐
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
     * @tags 教师端/智能推荐
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
     * @tags 教师端/智能推荐
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
     * @tags 学员端
     * @name FrontLoginCreate
     * @summary 学员登录
     * @request POST:/sgks/front/login
     */
    frontLoginCreate: (
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
        path: `/sgks/front/login`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 学员端
     * @name FrontMyInfoList
     * @summary 查看学员自己的基本信息
     * @request GET:/sgks/front/myInfo
     */
    frontMyInfoList: (params: RequestParams = {}) =>
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
        path: `/sgks/front/myInfo`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 学员端
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
